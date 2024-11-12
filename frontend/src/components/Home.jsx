function Home() {
  return (
    <div className="bg-primary-content my-10 px-10 py-5 rounded-md space-y-5">
      <p className="text-2xl">Account session demo</p>
      <div className="space-y-2">
        <div>
          <p className="text-sm text-slate-500">Available Features</p>
          <ul>
            <li>User login and registration</li>
            <li>Account management</li>
            <li>Session persistence through cookies</li>
            <li>Theme toggle</li>
            <li>User Browser</li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-slate-500">Incoming Features</p>
          <ul>
            <li>Power Users</li>
            <li>Email OTP</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home;