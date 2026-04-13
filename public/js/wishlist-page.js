(function () {
  class WishlistPage {
    constructor() {
      this.container = document.getElementById("wishlistContainer");
      this.totalItems = document.getElementById("totalItems");
      this.wishlist = this.getWishlist();
    }

    getWishlist() {
      const stored = localStorage.getItem("homify-wishlist") || "[]";
      return JSON.parse(stored);
    }

    async init() {
      if (!this.container || !this.totalItems) return;

      this.totalItems.textContent = String(this.wishlist.length);

      if (this.wishlist.length === 0) {
        this.renderEmptyState(
          "Your wishlist is empty",
          "Start saving properties so you can compare them later without losing track."
        );
        return;
      }

      try {
        const response = await fetch("/wishlist/get-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ listingIds: this.wishlist }),
        });

        if (!response.ok) {
          throw new Error("Wishlist request failed");
        }

        const listings = await response.json();
        if (!Array.isArray(listings) || listings.length === 0) {
          this.renderEmptyState(
            "Saved listings were not found",
            "Some properties may have been removed. You can browse again and save fresh options."
          );
          return;
        }

        this.renderListings(listings);
      } catch (error) {
        console.error("Error loading wishlist:", error);
        this.container.innerHTML = `
          <div class="alert alert-danger" role="alert">
            <i class="fa-solid fa-circle-exclamation me-2"></i>
            We could not load your wishlist right now. Please try again.
          </div>
        `;
      }
    }

    renderEmptyState(title, copy) {
      this.container.innerHTML = `
        <div class="shell-card empty-state">
          <div class="empty-state-icon"><i class="fa-solid fa-heart-crack"></i></div>
          <h2 class="h4">${title}</h2>
          <p class="text-soft mb-4">${copy}</p>
          <a href="/listings" class="btn btn-primary">Browse listings</a>
        </div>
      `;
    }

    renderListings(listings) {
      const cards = listings.map((listing) => {
        const imageUrl = listing.image?.url || "https://via.placeholder.com/800x600?text=No+Image";
        const price = Number(listing.price || 0).toLocaleString("en-IN");
        const description =
          listing.description?.length > 110
            ? `${listing.description.substring(0, 110)}...`
            : listing.description || "No description available.";

        return `
          <article class="listing-card fade-up">
            <div class="listing-media">
              <img src="${imageUrl}" alt="${listing.title}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Image+Unavailable';">
              <button class="wishlist-btn active" data-listing-id="${listing._id}" aria-label="Remove from wishlist">
                <i class="fa-solid fa-heart"></i>
              </button>
              <div class="listing-badge">
                <i class="fa-solid fa-location-dot"></i>
                <span>${listing.location}</span>
              </div>
            </div>
            <div class="listing-card-body">
              <div class="listing-topline mb-2">
                <a href="/listings/${listing._id}">
                  <h3 class="h5 mb-0">${listing.title}</h3>
                </a>
                <span class="price-tag"><span class="currency">&#8377;</span>${price}</span>
              </div>
              <div class="listing-meta-row mb-3">
                <span><i class="fa-solid fa-earth-asia me-1"></i>${listing.country}</span>
                <span><i class="fa-solid fa-heart me-1"></i>Saved for later</span>
              </div>
              <p class="listing-description mb-3">${description}</p>
              <div class="listing-footer-row">
                <span class="text-soft"><i class="fa-solid fa-circle-check me-1 text-success"></i>Ready to compare</span>
                <a href="/listings/${listing._id}" class="btn btn-outline-primary btn-sm">View details</a>
              </div>
            </div>
          </article>
        `;
      });

      this.container.innerHTML = `<div class="wishlist-grid">${cards.join("")}</div>`;

      if (window.wishlistManager) {
        window.wishlistManager.initializeWishlistButtons();
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = new WishlistPage();
    page.init();
  });

  window.addEventListener("storage", () => {
    window.location.reload();
  });
})();
