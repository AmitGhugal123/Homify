class WishlistManager {
  constructor() {
    this.storageKey = "homify-wishlist";
    this.wishlist = this.loadWishlist();
    this.boundButtons = new WeakSet();
    this.initializeWishlistButtons();
    this.updateWishlistBadge();
  }

  loadWishlist() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  saveWishlist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
    this.updateWishlistBadge();
    window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: this.wishlist }));
  }

  initializeWishlistButtons() {
    document.querySelectorAll(".wishlist-btn").forEach((button) => {
      const listingId = button.dataset.listingId;
      this.updateButtonIcon(button, listingId);

      if (!this.boundButtons.has(button)) {
        button.addEventListener("click", (event) => this.toggleWishlist(event, listingId));
        this.boundButtons.add(button);
      }
    });
  }

  updateButtonIcon(button, listingId) {
    const icon = button.querySelector("i");
    const active = this.isInWishlist(listingId);

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));

    if (icon) {
      icon.classList.toggle("fa-solid", active);
      icon.classList.toggle("fa-regular", !active);
    }
  }

  toggleWishlist(event, listingId) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isInWishlist(listingId)) {
      this.removeFromWishlist(listingId);
      this.showNotification("Removed from wishlist", "info");
    } else {
      this.addToWishlist(listingId);
      this.showNotification("Added to wishlist", "success");
    }

    this.initializeWishlistButtons();
  }

  isInWishlist(listingId) {
    return this.wishlist.includes(listingId);
  }

  addToWishlist(listingId) {
    if (!this.isInWishlist(listingId)) {
      this.wishlist.push(listingId);
      this.saveWishlist();
    }
  }

  removeFromWishlist(listingId) {
    this.wishlist = this.wishlist.filter((id) => id !== listingId);
    this.saveWishlist();
  }

  updateWishlistBadge() {
    const badge = document.getElementById("wishlistBadge");
    const count = document.getElementById("wishlistCount");
    if (!badge || !count) return;

    count.textContent = String(this.wishlist.length);
    badge.classList.toggle("d-none", this.wishlist.length === 0);
  }

  showNotification(message, type = "info") {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} position-fixed`;
    alert.setAttribute("role", "status");
    alert.style.top = "88px";
    alert.style.right = "20px";
    alert.style.zIndex = "1080";
    alert.textContent = message;

    document.body.appendChild(alert);
    window.setTimeout(() => alert.remove(), 2200);
  }
}

let wishlistManager;

document.addEventListener("DOMContentLoaded", async () => {
  wishlistManager = new WishlistManager();
  window.wishlistManager = wishlistManager;

  // If user is logged in, try to sync with server wishlist
  try {
    if (window.__CURRENT_USER) {
      const resp = await fetch('/wishlist/user');
      if (resp.ok) {
        const serverIds = await resp.json();
        if (Array.isArray(serverIds)) {
          wishlistManager.wishlist = serverIds;
          wishlistManager.saveWishlist();
          wishlistManager.initializeWishlistButtons();
        }
      }
    }
  } catch (e) {
    // Fail silently - localStorage fallback remains
    console.error('Wishlist sync failed', e);
  }
});

window.addEventListener("storage", () => {
  if (!wishlistManager) return;
  wishlistManager.wishlist = wishlistManager.loadWishlist();
  wishlistManager.initializeWishlistButtons();
  wishlistManager.updateWishlistBadge();
});

// Override add/remove to call server endpoints when logged-in
const origAdd = WishlistManager.prototype.addToWishlist;
const origRemove = WishlistManager.prototype.removeFromWishlist;

WishlistManager.prototype.addToWishlist = function(listingId) {
  if (window.__CURRENT_USER) {
    // optimistic UI: update local UI, then persist
    if (!this.isInWishlist(listingId)) {
      origAdd.call(this, listingId);
      fetch(`/wishlist/add/${listingId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
        .then(r => r.json())
        .then(data => {
          if (!data.success) {
            // revert
            this.removeFromWishlist(listingId);
            this.showNotification('Failed to add to wishlist', 'danger');
          } else if (Array.isArray(data.wishlist)) {
            this.wishlist = data.wishlist;
            this.saveWishlist();
            this.initializeWishlistButtons();
          }
        }).catch(() => {
          this.removeFromWishlist(listingId);
          this.showNotification('Failed to add to wishlist', 'danger');
        });
    }
  } else {
    origAdd.call(this, listingId);
  }
};

WishlistManager.prototype.removeFromWishlist = function(listingId) {
  if (window.__CURRENT_USER) {
    if (this.isInWishlist(listingId)) {
      // optimistic UI
      origRemove.call(this, listingId);
      fetch(`/wishlist/remove/${listingId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
        .then(r => r.json())
        .then(data => {
          if (!data.success) {
            // revert
            origAdd.call(this, listingId);
            this.showNotification('Failed to remove from wishlist', 'danger');
          } else if (Array.isArray(data.wishlist)) {
            this.wishlist = data.wishlist;
            this.saveWishlist();
            this.initializeWishlistButtons();
          }
        }).catch(() => {
          origAdd.call(this, listingId);
          this.showNotification('Failed to remove from wishlist', 'danger');
        });
    }
  } else {
    origRemove.call(this, listingId);
  }
};
