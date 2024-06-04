import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);

  const handleCreateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateUser(name, photoURL).then(() => {
          Swal.fire({
            title: "Success!!",
            text: "User Created Successfully!!",
            icon: "success",
            timer: 1500,
          });
          form.reset();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200 pt-20">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Register now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-none">
          <form onSubmit={handleCreateUser} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                name="photoURL"
                type="text"
                placeholder="photoURL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
            <div className="text-center">
              Already have an account? <Link to={"/login"}>Login here!!</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
