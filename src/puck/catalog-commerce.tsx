"use client";

import { useState } from "react";
import {
  boxedFromProps,
  commonSpacingFields,
  defaultSpacing,
  defaultSpacingGroup,
  demoProducts,
  imageField,
  resolveSpacing,
  sectionFromProps,
} from "./section-shared";

const mockCartItems = demoProducts.slice(0, 2).map((p) => ({ ...p, qty: 1 }));

export const catalogCommerceComponents = {
  MiniCart: {
    label: "Mini Cart",
    fields: {
      itemCount: { type: "number" as const, label: "Số SP trong giỏ", min: 0 },
      ...commonSpacingFields,
    },
    defaultProps: {
      itemCount: 2,
      spacing: defaultSpacingGroup(16, { background: "#fff", maxWidth: 360 }),
    },
    render: (props: Record<string, unknown>) => {
      const { itemCount } = props as { itemCount: number };
      const [open, setOpen] = useState(false);
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              🛒
              {itemCount > 0 ? (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -8,
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {itemCount}
                </span>
              ) : null}
            </button>
            {open ? (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 8,
                  width: 300,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  zIndex: 10,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Giỏ hàng ({itemCount})</div>
                {mockCartItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ color: "#0f766e" }}>{item.price}</div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#0f766e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: 8,
                  }}
                >
                  Thanh toán
                </button>
              </div>
            ) : null}
          </div>
        )
      );
    },
  },

  CartDrawer: {
    label: "Cart Drawer",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Giỏ hàng của bạn",
      spacing: defaultSpacingGroup(0, {
        padding: defaultSpacing(0),
        background: "#fff",
        maxWidth: 400,
      }),
    },
    render: (props: Record<string, unknown>) => {
      const { title } = props as { title: string };
      return sectionFromProps(
        props,
        <div
          style={{
            maxWidth: resolveSpacing(props).maxWidth,
            marginLeft: "auto",
            border: "1px solid #e2e8f0",
            borderRadius: "12px 0 0 12px",
            padding: 24,
            minHeight: 400,
          }}
        >
          {title ? <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700 }}>{title}</h3> : null}
          {mockCartItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                paddingBottom: 16,
                marginBottom: 16,
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                <div style={{ color: "#0f766e", fontWeight: 700, marginTop: 4 }}>{item.price}</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>SL: {item.qty}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: 16 }}>
            <span>Tổng</span>
            <span>1.589.000đ</span>
          </div>
          <button
            type="button"
            style={{
              width: "100%",
              padding: 14,
              background: "#0f766e",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Thanh toán
          </button>
        </div>
      );
    },
  },

  Wishlist: {
    label: "Wishlist",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      products: {
        type: "array" as const,
        label: "Sản phẩm yêu thích",
        getItemSummary: (item: { name?: string }) => item.name || "SP",
        defaultItemProps: demoProducts[0],
        arrayFields: {
          name: { type: "text" as const, label: "Tên" },
          price: { type: "text" as const, label: "Giá" },
          image: imageField("Ảnh"),
          href: { type: "text" as const, label: "Link" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Danh sách yêu thích",
      products: demoProducts.slice(0, 3),
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 480 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, products } = props as {
        title: string;
        products: { name: string; price: string; image: string; href?: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {title ? <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700 }}>{title}</h3> : null}
            {products.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                  <div style={{ color: "#0f766e", fontSize: 13 }}>{p.price}</div>
                </div>
                <span style={{ color: "#ef4444", fontSize: 18 }}>♥</span>
              </div>
            ))}
          </>
        )
      );
    },
  },

  CompareProducts: {
    label: "Compare Products",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      products: {
        type: "array" as const,
        label: "Sản phẩm so sánh",
        getItemSummary: (item: { name?: string }) => item.name || "SP",
        defaultItemProps: {
          name: "SP",
          price: "0đ",
          image: demoProducts[0].image,
          feature1: "Có",
          feature2: "Không",
        },
        arrayFields: {
          name: { type: "text" as const, label: "Tên" },
          price: { type: "text" as const, label: "Giá" },
          image: imageField("Ảnh"),
          feature1: { type: "text" as const, label: "Tính năng 1" },
          feature2: { type: "text" as const, label: "Tính năng 2" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "So sánh sản phẩm",
      products: [
        {
          name: "Áo thun Premium",
          price: "299.000đ",
          image: demoProducts[0].image,
          feature1: "Cotton 100%",
          feature2: "Có",
        },
        {
          name: "Giày sneaker",
          price: "1.290.000đ",
          image: demoProducts[1].image,
          feature1: "Da tổng hợp",
          feature2: "Không",
        },
      ],
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, products } = props as {
        title: string;
        products: {
          name: string;
          price: string;
          image: string;
          feature1: string;
          feature2: string;
        }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {title ? <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700 }}>{title}</h3> : null}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ padding: 12, textAlign: "left", borderBottom: "2px solid #e2e8f0" }} />
                    {products.map((p, i) => (
                      <th
                        key={i}
                        style={{
                          padding: 12,
                          textAlign: "center",
                          borderBottom: "2px solid #e2e8f0",
                          minWidth: 160,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 8,
                            margin: "0 auto 8px",
                            display: "block",
                          }}
                        />
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Giá", key: "price" as const },
                    { label: "Chất liệu", key: "feature1" as const },
                    { label: "Còn hàng", key: "feature2" as const },
                  ].map((row) => (
                    <tr key={row.key}>
                      <td style={{ padding: 12, fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>
                        {row.label}
                      </td>
                      {products.map((p, i) => (
                        <td
                          key={i}
                          style={{ padding: 12, textAlign: "center", borderBottom: "1px solid #f1f5f9" }}
                        >
                          {p[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      );
    },
  },

  QuickView: {
    label: "Quick View",
    fields: {
      name: { type: "text" as const, label: "Tên SP" },
      price: { type: "text" as const, label: "Giá" },
      image: imageField("Ảnh"),
      description: { type: "textarea" as const, label: "Mô tả ngắn" },
      ...commonSpacingFields,
    },
    defaultProps: {
      name: "Áo thun Premium",
      price: "299.000đ",
      image: demoProducts[0].image,
      description: "Áo thun cotton cao cấp, form regular fit, thoáng mát.",
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { name, price, image, description } = props as {
        name: string;
        price: string;
        image: string;
        description: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="cat-quickview"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <style>{`@media (min-width: 640px) { .cat-quickview { grid-template-columns: 1fr 1fr; } }`}</style>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={name} style={{ width: "100%", borderRadius: 8, objectFit: "cover" }} />
            <div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{name}</h3>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0f766e", margin: "12px 0" }}>{price}</div>
              {description ? (
                <p style={{ color: "#64748b", lineHeight: 1.6, fontSize: 14 }}>{description}</p>
              ) : null}
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: 12,
                    background: "#0f766e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Thêm vào giỏ
                </button>
                <button
                  type="button"
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ♥
                </button>
              </div>
            </div>
          </div>
        )
      );
    },
  },

  ProductFilters: {
    label: "Product Filters",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      filters: {
        type: "array" as const,
        label: "Nhóm lọc",
        getItemSummary: (item: { group?: string }) => item.group || "Filter",
        defaultItemProps: { group: "Danh mục", options: "Áo, Quần, Giày" },
        arrayFields: {
          group: { type: "text" as const, label: "Nhóm" },
          options: { type: "text" as const, label: "Tùy chọn (phẩy)" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Bộ lọc",
      filters: [
        { group: "Danh mục", options: "Áo, Quần, Giày, Phụ kiện" },
        { group: "Giá", options: "Dưới 500k, 500k-1tr, Trên 1tr" },
        { group: "Màu sắc", options: "Đen, Trắng, Xanh" },
      ],
      spacing: defaultSpacingGroup(24, { background: "#f8fafc", maxWidth: 280 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, filters } = props as {
        title: string;
        filters: { group: string; options: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <>
            {title ? <h4 style={{ margin: "0 0 16px", fontWeight: 700 }}>{title}</h4> : null}
            {filters.map((f, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{f.group}</div>
                {f.options.split(",").map((opt, j) => (
                  <label
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 13,
                      marginBottom: 6,
                      cursor: "pointer",
                    }}
                  >
                    <input type="checkbox" />
                    {opt.trim()}
                  </label>
                ))}
              </div>
            ))}
          </>
        )
      );
    },
  },

  BreadcrumbNav: {
    label: "Breadcrumb",
    fields: {
      crumbs: {
        type: "array" as const,
        label: "Breadcrumb",
        getItemSummary: (item: { label?: string }) => item.label || "Crumb",
        defaultItemProps: { label: "Trang", href: "#" },
        arrayFields: {
          label: { type: "text" as const, label: "Nhãn" },
          href: { type: "text" as const, label: "Link" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      crumbs: [
        { label: "Trang chủ", href: "/" },
        { label: "Sản phẩm", href: "/products" },
        { label: "Áo thun", href: "#" },
      ],
      spacing: defaultSpacingGroup(16, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { crumbs } = props as { crumbs: { label: string; href?: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <nav style={{ fontSize: 13, color: "#64748b" }}>
            {crumbs.map((c, i) => (
              <span key={i}>
                {i > 0 ? <span style={{ margin: "0 8px" }}>/</span> : null}
                {i < crumbs.length - 1 ? (
                  <a href={c.href || "#"} style={{ color: "#64748b", textDecoration: "none" }}>
                    {c.label}
                  </a>
                ) : (
                  <span style={{ color: "#0f172a", fontWeight: 600 }}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )
      );
    },
  },

  SearchBar: {
    label: "Search Bar",
    fields: {
      placeholder: { type: "text" as const, label: "Placeholder" },
      buttonLabel: { type: "text" as const, label: "Nút tìm" },
      ...commonSpacingFields,
    },
    defaultProps: {
      placeholder: "Tìm sản phẩm...",
      buttonLabel: "Tìm",
      spacing: defaultSpacingGroup(16, { background: "#fff", maxWidth: 480 }),
    },
    render: (props: Record<string, unknown>) => {
      const { placeholder, buttonLabel } = props as { placeholder: string; buttonLabel: string };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 8 }}>
            <input
              type="search"
              placeholder={placeholder}
              style={{
                flex: 1,
                padding: "10px 16px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 14,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "#0f766e",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {buttonLabel}
            </button>
          </form>
        )
      );
    },
  },

  ContactForm: {
    label: "Contact Form",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      buttonLabel: { type: "text" as const, label: "Nút gửi" },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Liên hệ",
      buttonLabel: "Gửi tin nhắn",
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 480 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, buttonLabel } = props as { title: string; buttonLabel: string };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <form onSubmit={(e) => e.preventDefault()}>
            {title ? <h3 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 700 }}>{title}</h3> : null}
            {[
              { label: "Họ tên", type: "text" },
              { label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                Tin nhắn
              </label>
              <textarea
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 14,
                  boxSizing: "border-box",
                  resize: "vertical",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: 12,
                background: "#0f766e",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {buttonLabel}
            </button>
          </form>
        )
      );
    },
  },

  GoogleMapEmbed: {
    label: "Google Map",
    fields: {
      embedUrl: { type: "text" as const, label: "URL iframe embed" },
      height: { type: "number" as const, label: "Chiều cao (px)", min: 200 },
      ...commonSpacingFields,
    },
    defaultProps: {
      embedUrl: "https://maps.google.com/maps?q=Ho+Chi+Minh+City&output=embed",
      height: 360,
      spacing: defaultSpacingGroup(0, {
        padding: defaultSpacing(0),
        background: "#fff",
        maxWidth: 1140,
      }),
    },
    render: (props: Record<string, unknown>) => {
      const { embedUrl, height } = props as { embedUrl: string; height: number };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          embedUrl ? (
            <iframe
              src={embedUrl}
              title="Map"
              style={{ width: "100%", height, border: "none", borderRadius: 12 }}
            />
          ) : (
            <div
              style={{
                height,
                background: "#e2e8f0",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
              }}
            >
              Bản đồ
            </div>
          )
        )
      );
    },
  },

  StoreLocation: {
    label: "Store Location",
    fields: {
      stores: {
        type: "array" as const,
        label: "Cửa hàng",
        getItemSummary: (item: { name?: string }) => item.name || "CH",
        defaultItemProps: { name: "Cửa hàng", address: "123 Đường ABC, Q.1, TP.HCM", phone: "0901 234 567" },
        arrayFields: {
          name: { type: "text" as const, label: "Tên CH" },
          address: { type: "textarea" as const, label: "Địa chỉ" },
          phone: { type: "text" as const, label: "Điện thoại" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      stores: [
        { name: "Showroom Q.1", address: "123 Nguyễn Huệ, Q.1, TP.HCM", phone: "0901 234 567" },
        { name: "Showroom Q.7", address: "456 Nguyễn Thị Thập, Q.7, TP.HCM", phone: "0902 345 678" },
      ],
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 720 }),
    },
    render: (props: Record<string, unknown>) => {
      const { stores } = props as { stores: { name: string; address: string; phone?: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {stores.map((s, i) => (
              <div key={i} style={{ padding: 20, border: "1px solid #e2e8f0", borderRadius: 10 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.5 }}>{s.address}</div>
                {s.phone ? (
                  <div style={{ fontSize: 14, marginTop: 6, color: "#0f766e", fontWeight: 600 }}>{s.phone}</div>
                ) : null}
              </div>
            ))}
          </div>
        )
      );
    },
  },

  ContactInfoBlock: {
    label: "Contact Info",
    fields: {
      phone: { type: "text" as const, label: "Điện thoại" },
      email: { type: "text" as const, label: "Email" },
      address: { type: "textarea" as const, label: "Địa chỉ" },
      hours: { type: "text" as const, label: "Giờ làm việc" },
      ...commonSpacingFields,
    },
    defaultProps: {
      phone: "1900 1234",
      email: "support@store.com",
      address: "123 Đường ABC, Q.1, TP.HCM",
      hours: "T2-T7: 8:00 - 21:00",
      spacing: defaultSpacingGroup(32, { background: "#f8fafc", maxWidth: 400 }),
    },
    render: (props: Record<string, unknown>) => {
      const { phone, email, address, hours } = props as {
        phone: string;
        email: string;
        address: string;
        hours: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14 }}>
            {phone ? (
              <div>
                <strong>📞</strong> {phone}
              </div>
            ) : null}
            {email ? (
              <div>
                <strong>✉️</strong> {email}
              </div>
            ) : null}
            {address ? (
              <div>
                <strong>📍</strong> {address}
              </div>
            ) : null}
            {hours ? (
              <div>
                <strong>🕐</strong> {hours}
              </div>
            ) : null}
          </div>
        )
      );
    },
  },

  CounterStats: {
    label: "Counter Stats",
    fields: {
      stats: {
        type: "array" as const,
        label: "Số liệu",
        getItemSummary: (item: { label?: string }) => item.label || "Stat",
        defaultItemProps: { value: "1000+", label: "Khách hàng" },
        arrayFields: {
          value: { type: "text" as const, label: "Giá trị" },
          label: { type: "text" as const, label: "Nhãn" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      stats: [
        { value: "10K+", label: "Khách hàng" },
        { value: "500+", label: "Sản phẩm" },
        { value: "99%", label: "Hài lòng" },
        { value: "24/7", label: "Hỗ trợ" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#0f172a", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { stats } = props as { stats: { value: string; label: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="cat-counter"
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(2, 1fr)",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <style>{`@media (min-width: 768px) { .cat-counter { grid-template-columns: repeat(${stats.length}, 1fr); } }`}</style>
            {stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 36, fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  ProgressBar: {
    label: "Progress Bar",
    fields: {
      bars: {
        type: "array" as const,
        label: "Thanh tiến trình",
        getItemSummary: (item: { label?: string }) => item.label || "Bar",
        defaultItemProps: { label: "Kỹ năng", percent: 80 },
        arrayFields: {
          label: { type: "text" as const, label: "Nhãn" },
          percent: { type: "number" as const, label: "%", min: 0, max: 100 },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      bars: [
        { label: "Chất lượng", percent: 95 },
        { label: "Dịch vụ", percent: 88 },
        { label: "Giao hàng", percent: 92 },
      ],
      spacing: defaultSpacingGroup(32, { background: "#fff", maxWidth: 480 }),
    },
    render: (props: Record<string, unknown>) => {
      const { bars } = props as { bars: { label: string; percent: number }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {bars.map((b, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{b.label}</span>
                  <span style={{ color: "#64748b" }}>{b.percent}%</span>
                </div>
                <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${b.percent}%`,
                      background: "#0f766e",
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  StatsBlock: {
    label: "Stats Block",
    fields: {
      stats: {
        type: "array" as const,
        label: "Thống kê",
        getItemSummary: (item: { label?: string }) => item.label || "Stat",
        defaultItemProps: { value: "100", label: "Label", icon: "📊" },
        arrayFields: {
          icon: { type: "text" as const, label: "Icon" },
          value: { type: "text" as const, label: "Giá trị" },
          label: { type: "text" as const, label: "Nhãn" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      stats: [
        { icon: "📦", value: "2K+", label: "Đơn hàng" },
        { icon: "⭐", value: "4.9", label: "Đánh giá" },
        { icon: "🚚", value: "48h", label: "Giao hàng" },
      ],
      spacing: defaultSpacingGroup(32, { background: "#f8fafc", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { stats } = props as { stats: { icon: string; value: string; label: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: 20,
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  minWidth: 140,
                }}
              >
                <div style={{ fontSize: 28 }}>{s.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  PricingTable: {
    label: "Pricing Table",
    fields: {
      plans: {
        type: "array" as const,
        label: "Gói",
        getItemSummary: (item: { name?: string }) => item.name || "Plan",
        defaultItemProps: {
          name: "Basic",
          price: "299.000đ/tháng",
          features: "Tính năng 1, Tính năng 2",
          cta: "Chọn gói",
          ctaHref: "#",
          highlighted: "no" as const,
        },
        arrayFields: {
          name: { type: "text" as const, label: "Tên gói" },
          price: { type: "text" as const, label: "Giá" },
          features: { type: "text" as const, label: "Tính năng (phẩy)" },
          cta: { type: "text" as const, label: "CTA" },
          ctaHref: { type: "text" as const, label: "Link" },
          highlighted: {
            type: "radio" as const,
            label: "Nổi bật",
            options: [
              { label: "Có", value: "yes" },
              { label: "Không", value: "no" },
            ],
          },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      plans: [
        {
          name: "Cơ bản",
          price: "Miễn phí",
          features: "100 SP, Email support",
          cta: "Bắt đầu",
          ctaHref: "#",
          highlighted: "no" as const,
        },
        {
          name: "Pro",
          price: "499.000đ/tháng",
          features: "Không giới hạn SP, Priority support, Analytics",
          cta: "Nâng cấp",
          ctaHref: "#",
          highlighted: "yes" as const,
        },
        {
          name: "Enterprise",
          price: "Liên hệ",
          features: "Custom, Dedicated support, API",
          cta: "Liên hệ",
          ctaHref: "#",
          highlighted: "no" as const,
        },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { plans } = props as {
        plans: {
          name: string;
          price: string;
          features: string;
          cta: string;
          ctaHref: string;
          highlighted: "yes" | "no";
        }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div className="cat-pricing" style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr" }}>
            <style>{`@media (min-width: 768px) { .cat-pricing { grid-template-columns: repeat(${plans.length}, 1fr); } }`}</style>
            {plans.map((p, i) => (
              <div
                key={i}
                style={{
                  border: p.highlighted === "yes" ? "2px solid #0f766e" : "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 28,
                  textAlign: "center",
                  background: p.highlighted === "yes" ? "#f0fdfa" : "#fff",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 18 }}>{p.name}</div>
                <div style={{ fontSize: 28, fontWeight: 800, margin: "12px 0", color: "#0f766e" }}>{p.price}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", fontSize: 14, color: "#64748b" }}>
                  {p.features.split(",").map((f, j) => (
                    <li key={j} style={{ padding: "4px 0" }}>
                      ✓ {f.trim()}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.ctaHref || "#"}
                  style={{
                    display: "inline-block",
                    padding: "10px 24px",
                    background: p.highlighted === "yes" ? "#0f766e" : "#fff",
                    color: p.highlighted === "yes" ? "#fff" : "#0f766e",
                    border: "2px solid #0f766e",
                    borderRadius: 8,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  TeamMembers: {
    label: "Team Members",
    fields: {
      members: {
        type: "array" as const,
        label: "Thành viên",
        getItemSummary: (item: { name?: string }) => item.name || "Member",
        defaultItemProps: {
          name: "Tên",
          role: "Vai trò",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
          facebook: "#",
          linkedin: "#",
        },
        arrayFields: {
          name: { type: "text" as const, label: "Tên" },
          role: { type: "text" as const, label: "Vai trò" },
          avatar: imageField("Avatar"),
          facebook: { type: "text" as const, label: "Facebook" },
          linkedin: { type: "text" as const, label: "LinkedIn" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      members: [
        {
          name: "Nguyễn Văn A",
          role: "CEO",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
          facebook: "#",
          linkedin: "#",
        },
        {
          name: "Trần Thị B",
          role: "Designer",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
          facebook: "#",
          linkedin: "#",
        },
        {
          name: "Lê Văn C",
          role: "Developer",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
          facebook: "#",
          linkedin: "#",
        },
      ],
      spacing: defaultSpacingGroup(48, { background: "#fff", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { members } = props as {
        members: { name: string; role: string; avatar: string; facebook?: string; linkedin?: string }[];
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div className="cat-team" style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr" }}>
            <style>{`@media (min-width: 640px) { .cat-team { grid-template-columns: repeat(${Math.min(members.length, 3)}, 1fr); } }`}</style>
            {members.map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.avatar}
                  alt={m.name}
                  style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", margin: "0 auto" }}
                />
                <div style={{ fontWeight: 700, marginTop: 12 }}>{m.name}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{m.role}</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8 }}>
                  {m.facebook ? (
                    <a href={m.facebook} style={{ fontSize: 12, color: "#64748b" }}>
                      FB
                    </a>
                  ) : null}
                  {m.linkedin ? (
                    <a href={m.linkedin} style={{ fontSize: 12, color: "#64748b" }}>
                      IN
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  FooterColumns: {
    label: "Footer Columns",
    fields: {
      columns: {
        type: "array" as const,
        label: "Cột footer",
        getItemSummary: (item: { title?: string }) => item.title || "Cột",
        defaultItemProps: { title: "Liên kết", links: "Trang chủ, Sản phẩm, Liên hệ" },
        arrayFields: {
          title: { type: "text" as const, label: "Tiêu đề cột" },
          links: { type: "text" as const, label: "Links (phẩy)" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      columns: [
        { title: "Cửa hàng", links: "Tất cả SP, Sale, Mới về" },
        { title: "Hỗ trợ", links: "FAQ, Vận chuyển, Đổi trả" },
        { title: "Công ty", links: "Về chúng tôi, Tuyển dụng, Blog" },
        { title: "Liên hệ", links: "Email, Hotline, Showroom" },
      ],
      spacing: defaultSpacingGroup(48, { background: "#0f172a", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { columns } = props as { columns: { title: string; links: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div
            className="cat-footer-cols"
            style={{ display: "grid", gap: 32, gridTemplateColumns: "1fr", color: "#94a3b8" }}
          >
            <style>{`@media (min-width: 640px) { .cat-footer-cols { grid-template-columns: repeat(2, 1fr); } } @media (min-width: 992px) { .cat-footer-cols { grid-template-columns: repeat(${columns.length}, 1fr); } }`}</style>
            {columns.map((col, i) => (
              <div key={i}>
                <div style={{ color: "#fff", fontWeight: 700, marginBottom: 12, fontSize: 14 }}>{col.title}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13 }}>
                  {col.links.split(",").map((link, j) => (
                    <li key={j} style={{ marginBottom: 8 }}>
                      <a href="#" style={{ color: "#94a3b8", textDecoration: "none" }}>
                        {link.trim()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      );
    },
  },

  CopyrightBar: {
    label: "Copyright Bar",
    fields: {
      text: { type: "text" as const, label: "Text bản quyền" },
      showYear: {
        type: "radio" as const,
        label: "Hiện năm",
        options: [
          { label: "Có", value: "yes" },
          { label: "Không", value: "no" },
        ],
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      text: "© Your Store. All rights reserved.",
      showYear: "yes" as const,
      spacing: defaultSpacingGroup(16, { background: "#0f172a", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { text, showYear } = props as { text: string; showYear: "yes" | "no" };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ textAlign: "center", fontSize: 13, color: "#64748b" }}>
            {showYear === "yes" ? `${new Date().getFullYear()} ` : ""}
            {text}
          </div>
        )
      );
    },
  },

  PaymentIcons: {
    label: "Payment Icons",
    fields: {
      methods: {
        type: "array" as const,
        label: "Phương thức",
        getItemSummary: (item: { label?: string }) => item.label || "Payment",
        defaultItemProps: { label: "Visa" },
        arrayFields: { label: { type: "text" as const, label: "Tên" } },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      methods: [{ label: "Visa" }, { label: "Mastercard" }, { label: "MoMo" }, { label: "COD" }],
      spacing: defaultSpacingGroup(16, { background: "#fff", maxWidth: 480 }),
    },
    render: (props: Record<string, unknown>) => {
      const { methods } = props as { methods: { label: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {methods.map((m, i) => (
              <span
                key={i}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#475569",
                }}
              >
                {m.label}
              </span>
            ))}
          </div>
        )
      );
    },
  },

  FooterMenu: {
    label: "Footer Menu",
    fields: {
      links: {
        type: "array" as const,
        label: "Link",
        getItemSummary: (item: { label?: string }) => item.label || "Link",
        defaultItemProps: { label: "Link", href: "#" },
        arrayFields: {
          label: { type: "text" as const, label: "Nhãn" },
          href: { type: "text" as const, label: "URL" },
        },
      },
      ...commonSpacingFields,
    },
    defaultProps: {
      links: [
        { label: "Trang chủ", href: "/" },
        { label: "Sản phẩm", href: "/products" },
        { label: "Blog", href: "/blog" },
        { label: "Liên hệ", href: "/contact" },
      ],
      spacing: defaultSpacingGroup(16, { background: "#0f172a", maxWidth: 1140 }),
    },
    render: (props: Record<string, unknown>) => {
      const { links } = props as { links: { label: string; href?: string }[] };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <nav style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
            {links.map((l, i) => (
              <a key={i} href={l.href || "#"} style={{ color: "#94a3b8", textDecoration: "none", fontSize: 13 }}>
                {l.label}
              </a>
            ))}
          </nav>
        )
      );
    },
  },

  FooterNewsletter: {
    label: "Footer Newsletter",
    fields: {
      title: { type: "text" as const, label: "Tiêu đề" },
      subtitle: { type: "textarea" as const, label: "Mô tả" },
      buttonLabel: { type: "text" as const, label: "Nút" },
      ...commonSpacingFields,
    },
    defaultProps: {
      title: "Đăng ký nhận tin",
      subtitle: "Nhận ưu đãi độc quyền qua email.",
      buttonLabel: "Đăng ký",
      spacing: defaultSpacingGroup(32, { background: "#0f172a", maxWidth: 480 }),
    },
    render: (props: Record<string, unknown>) => {
      const { title, subtitle, buttonLabel } = props as {
        title: string;
        subtitle: string;
        buttonLabel: string;
      };
      return sectionFromProps(
        props,
        boxedFromProps(
          props,
          <div style={{ color: "#fff" }}>
            {title ? <h4 style={{ margin: "0 0 6px", fontWeight: 700 }}>{title}</h4> : null}
            {subtitle ? (
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "#94a3b8" }}>{subtitle}</p>
            ) : null}
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="Email"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  border: "1px solid #334155",
                  borderRadius: 8,
                  background: "#1e293b",
                  color: "#fff",
                  fontSize: 13,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 18px",
                  background: "#0f766e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                {buttonLabel}
              </button>
            </form>
          </div>
        )
      );
    },
  },
};
