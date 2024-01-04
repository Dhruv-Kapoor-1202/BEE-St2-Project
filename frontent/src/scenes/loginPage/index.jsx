import Form from "./Form.jsx";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col bg-pink-100 p-2 rounded-[33px]">
        <div className="navbar bg-pink-50 p-2 rounded-[33px]">
          <button className="btn btn-ghost text-xl rounded-[33px]">
            My App
          </button>
        </div>

      </div>
      {/* <div>
        Welcome
      </div> */}
      <div className="flex flex-col bg-pink-100 p-2 rounded-[33px]">
        <Form />
      </div>

    </div>
  )
}

export default LoginPage