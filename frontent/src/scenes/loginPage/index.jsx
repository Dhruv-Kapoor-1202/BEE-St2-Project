import Form from "./Form.jsx";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-2 flex-grow-[1]">
      <div className="flex flex-col bg-pink-100 p-2 rounded-[33px] shadow-lg">
        <div className="navbar bg-pink-50 p-2 rounded-[33px] shadow-lg">
          <button className="btn btn-ghost text-xl rounded-[33px]">
            My App
          </button>
        </div>

      </div>
      {/* <div>
        Welcome
      </div> */}
      <div className="flex flex-col bg-pink-100 p-2 rounded-[33px] flex-grow-[1] shadow-lg">
        <Form />
      </div>

    </div>
  )
}

export default LoginPage