import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ban Nguyen - Fullstack Developer | Founder Sagozen Digital";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Fetch avatar image
  const avatarData = await fetch(
    new URL("/avatar.jpg", "https://pandev00.sitehub.bio"),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundImage:
          "linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)",
        padding: "60px 80px",
        position: "relative",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "50px",
          right: "80px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "4px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "70px",
          right: "100px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          display: "flex",
        }}
      />

      {/* Avatar Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "60px",
        }}
      >
        {/* Avatar Image with border */}
        <div
          style={{
            display: "flex",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            border: "6px solid rgba(255, 255, 255, 0.3)",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src={avatarData as any}
            width="240"
            height="240"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Content Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {/* Main heading */}
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            lineHeight: "1.2",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          Ban Nguyen
        </div>

        {/* Subheading */}
        <div
          style={{
            display: "flex",
            fontSize: "36px",
            fontWeight: "500",
            color: "rgba(255, 255, 255, 0.95)",
            lineHeight: "1.3",
            marginBottom: "32px",
          }}
        >
          Fullstack Developer
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            width: "280px",
            height: "2px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            marginBottom: "32px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            fontWeight: "400",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "24px",
            lineHeight: "1.4",
          }}
        >
          Vibe Code • Spatial Computing • White Label Apps
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            padding: "10px 28px",
            borderRadius: "25px",
            fontSize: "18px",
            fontWeight: "600",
            color: "white",
            width: "fit-content",
          }}
        >
          Founder @ Sagozen Digital
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          fontSize: "22px",
          fontWeight: "400",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        pandev00.sitehub.bio
      </div>
    </div>,
    {
      ...size,
    },
  );
}
