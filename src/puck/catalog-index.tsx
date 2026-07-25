"use client";

import { catalogHeroComponents } from "./catalog-hero";
import { catalogProductComponents } from "./catalog-products";
import { catalogCategoryComponents } from "./catalog-categories";
import { catalogMediaComponents } from "./catalog-media";
import { catalogContentComponents } from "./catalog-content";
import { catalogCommerceComponents } from "./catalog-commerce";

export const catalogSectionComponents = {
  ...catalogHeroComponents,
  ...catalogProductComponents,
  ...catalogCategoryComponents,
  ...catalogMediaComponents,
  ...catalogContentComponents,
  ...catalogCommerceComponents,
};

/** Danh mục kiểu “sớ” — title có số thứ tự, mặc định thu gọn */
export const catalogCategoryMap = {
  heroBanner: {
    title: "01 · Hero / Banner",
    defaultExpanded: false,
    components: [
      "HeroBanner",
      "Slideshow",
      "ImageBanner",
      "VideoBanner",
      "SplitBanner",
      "FullWidthBanner",
      "PromotionBanner",
    ],
  },
  products: {
    title: "02 · Sản phẩm",
    defaultExpanded: false,
    components: [
      "FeaturedProducts",
      "NewArrivals",
      "BestSellers",
      "OnSaleProducts",
      "CollectionList",
      "ProductGrid",
      "ProductCarousel",
      "ProductTabs",
      "ProductSlider",
      "RecentlyViewed",
    ],
  },
  categories: {
    title: "03 · Danh mục",
    defaultExpanded: false,
    components: [
      "CollectionGrid",
      "CategoryList",
      "CategorySlider",
      "ShopByCategory",
      "FeaturedCollections",
    ],
  },
  media: {
    title: "04 · Hình ảnh",
    defaultExpanded: false,
    components: [
      "ImageWithText",
      "ImageGalleryGrid",
      "MasonryGallery",
      "BeforeAfter",
      "Lookbook",
      "Hotspots",
    ],
  },
  contentBlocks: {
    title: "05 · Nội dung",
    defaultExpanded: false,
    components: [
      "RichText",
      "TextBlockSection",
      "FeatureList",
      "ContentTimeline",
      "BackgroundVideo",
      "VideoPopup",
    ],
  },
  cta: {
    title: "06 · CTA",
    defaultExpanded: false,
    components: [
      "CallToAction",
      "Newsletter",
      "EmailSignup",
      "PromotionBox",
      "CountdownTimer",
    ],
  },
  reviews: {
    title: "07 · Đánh giá",
    defaultExpanded: false,
    components: [
      "ReviewsSection",
      "RatingStars",
      "LogoList",
      "TrustBadges",
    ],
  },
  brands: {
    title: "08 · Thương hiệu",
    defaultExpanded: false,
    components: [
      "BrandCarousel",
      "BrandGrid",
      "LogoSlider",
      "PartnerLogos",
    ],
  },
  faq: {
    title: "09 · FAQ",
    defaultExpanded: false,
    components: [
      "FaqAccordionSection",
      "ToggleSection",
      "FaqSection",
      "TabsSection",
    ],
  },
  blog: {
    title: "10 · Blog",
    defaultExpanded: false,
    components: [
      "BlogPosts",
      "LatestNews",
      "ArticleGrid",
      "ArticleSlider",
    ],
  },
  social: {
    title: "11 · Mạng xã hội",
    defaultExpanded: false,
    components: [
      "InstagramFeed",
      "TikTokFeed",
      "SocialIcons",
      "SocialShare",
    ],
  },
  shopUi: {
    title: "12 · Shop UI",
    defaultExpanded: false,
    components: [
      "MiniCart",
      "CartDrawer",
      "Wishlist",
      "CompareProducts",
      "QuickView",
      "ProductFilters",
      "BreadcrumbNav",
      "SearchBar",
    ],
  },
  contact: {
    title: "13 · Liên hệ",
    defaultExpanded: false,
    components: [
      "ContactForm",
      "GoogleMapEmbed",
      "StoreLocation",
      "ContactInfoBlock",
    ],
  },
  info: {
    title: "14 · Thông tin",
    defaultExpanded: false,
    components: [
      "CounterStats",
      "ProgressBar",
      "StatsBlock",
      "PricingTable",
      "TeamMembers",
    ],
  },
  footerExtras: {
    title: "15 · Footer",
    defaultExpanded: false,
    components: [
      "FooterColumns",
      "CopyrightBar",
      "PaymentIcons",
      "FooterMenu",
      "FooterNewsletter",
    ],
  },
  custom: {
    title: "16 · Custom HTML",
    defaultExpanded: false,
    components: ["CustomHtml"],
  },
};

export type CatalogComponentKey = keyof typeof catalogSectionComponents;
export type CatalogCategoryKey = keyof typeof catalogCategoryMap;
