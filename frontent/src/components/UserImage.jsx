/* eslint-disable react/prop-types */

const UserImage = ({ image, size = "60px", classSize }) => {
  return (
    <div className="avatar">
      <div
        style={{ width: { size }, height: { size } }} width={size} height={size}
        className={`${classSize} rounded-full`}
      >
        <img
          style={{ objectFit: 'cover', borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`http://localhost:3001/assets/${image}`}
        />
      </div >

    </div>
  )
}

export default UserImage