import { Card } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

type Props = {
  title: string;
  value: number;
  created_at: string;
};

const StartCard = ({ title, value, created_at }: Props) => {
  return (
    <Card
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 24px 0 rgba(24, 144, 255, 0.13)",
        border: "none",
        minHeight: 150,
        transition: "box-shadow 0.25s, transform 0.25s",
        cursor: "pointer",
        background: "linear-gradient(135deg, #fafdff 60%, #e6f0ff 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1677ff 60%, #69c0ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px 0 rgba(22,119,255,0.10)",
          }}
        >
          <BarChartOutlined style={{ color: "#fff", fontSize: 24 }} />
        </div>
        <span
          style={{
            color: "#7b8794",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: 0.2,
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          margin: "8px 0 0 0",
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <span
          style={{
            color: "#1677ff",
            fontWeight: 900,
            fontSize: 36,
            lineHeight: 1.1,
            letterSpacing: 0.5,
            textShadow: "0 2px 8px rgba(22,119,255,0.08)",
          }}
        >
          {value.toLocaleString()}
        </span>
      </div>
      <div
        style={{
          color: "#b0b0b0",
          fontSize: 12,
          marginTop: 12,
          fontWeight: 500,
        }}
      >
        {new Date(created_at).toLocaleString()}
      </div>
    </Card>
  );
};

export default StartCard;
