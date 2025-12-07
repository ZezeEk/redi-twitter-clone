export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/logout");
    window.location.href = "/auth";
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}