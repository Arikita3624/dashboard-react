import { supabase } from "@/services/supabase";
import { Table, Skeleton, Input, Tag, Button, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  // Fetch current user ID on component mount
  useEffect(() => {
    document.title = "Users";
    const fetchCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    fetchCurrentUser();
  }, []);

  const handleBan = async (userId: string | number, currentStatus: string) => {
    // Prevent banning the current user
    if (userId === currentUserId) {
      messageApi.error("You cannot ban yourself!");
      return;
    }

    const newStatus = currentStatus === "banned" ? "ongoing" : "banned";
    const { error } = await supabase
      .from("profiles")
      .update({ status: newStatus })
      .eq("id", userId);
    if (error) {
      messageApi.error("Failed to update user status");
    } else {
      messageApi.success(
        `User has been ${
          newStatus === "banned" ? "banned" : "unbanned"
        } successfully`
      );
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data } = await supabase.from("profiles").select("*");
      setUsers(data || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_: string | number, __: string | number, idx: number) => idx + 1,
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (avatar_url: string) => (
        <img
          src={avatar_url}
          alt="err"
          width={50}
          style={{ borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const color = role === "admin" ? "red" : "cyan";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "banned" ? "red" : "green"}>
          {status === "banned" ? "Banned" : "On Going"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => (
        <p>{new Date(created_at).toLocaleString()}</p>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, user: any) => (
        <div className="flex gap-2">
          <Link to={`${user.id}/edit`}>
            <Button type="primary">Set Role</Button>
          </Link>
          {/* Disable ban button for current user */}
          {user.id !== currentUserId ? (
            <Popconfirm
              title="Ban User"
              description={
                user.status === "banned"
                  ? "Are you sure to unban this user?"
                  : "Are you sure to ban this user?"
              }
              onConfirm={() => handleBan(user.id, user.status)}
            >
              <Button type="primary" danger>
                {user.status === "banned" ? "Unban" : "Ban"}
              </Button>
            </Popconfirm>
          ) : (
            <Button type="primary" danger disabled>
              {user.status === "banned" ? "Unban" : "Ban"}
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      {contextHolder}
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <Input.Search
          placeholder="Search users"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 220 }}
        />
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{
            pageSize: 8,
            position: ["bottomCenter"],
          }}
        />
      )}
    </div>
  );
};

export default Users;
