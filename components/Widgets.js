export default function Widgets() {
  const news = [
    { title: "Dodgers Clinch World Series", time: "8h", category: "Sports", posts: "763K" },
    { title: "Two Men Arrested After Train Incident", time: "12h", category: "News", posts: "261K" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="sticky top-0 bg-white py-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <div className="bg-gray-100 rounded-2xl p-4 space-y-2">
        <h2 className="font-bold text-lg">Subscribe to Premium</h2>
        <p className="text-gray-600 text-sm">
          Subscribe to unlock new features and, if eligible, receive a share of revenue.
        </p>
        <button className="bg-sky-500 text-white px-4 py-1 rounded-full font-semibold hover:bg-sky-600">
          Subscribe
        </button>
      </div>
      <div className="bg-gray-100 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-3">Today’s News</h2>
        {news.map((item) => (
          <div
            key={item.title}
            className="flex flex-col space-y-1 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
          >
            <p className="font-semibold text-gray-800">{item.title}</p>
            <p className="text-sm text-gray-500">
              {item.time} · {item.category} · {item.posts} posts
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}