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

document.addEventListener("DOMContentLoaded", () => {
  wishlistManager = new WishlistManager();
  window.wishlistManager = wishlistManager;
});

window.addEventListener("storage", () => {
  if (!wishlistManager) return;
  wishlistManager.wishlist = wishlistManager.loadWishlist();
  wishlistManager.initializeWishlistButtons();
  wishlistManager.updateWishlistBadge();
});
