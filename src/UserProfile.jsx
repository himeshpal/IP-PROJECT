import PropTypes from "prop-types";

const UserProfile = ({ name = "", age = null, country = "" }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md my-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
          {name ? name[0]?.toUpperCase() : "?"}
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-900">
            {name || "No Name Provided"}
          </h2>
          <div className="text-gray-500">
            {age ? `${age} years old` : "Age not provided"} •{" "}
            {country || "Country not provided"}
          </div>
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  country: PropTypes.string,
};

export default UserProfile;
