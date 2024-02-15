
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import Modal from "./Modal";


const Signup = () => {

    const {
        register,
        handleSubmit,
        
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => console.log(data)
    
      
  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto mt-20 bg-white shadow">
        <div className="flex flex-col justify-center mt-0 modal-action">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="text-lg font-bold">Create an Account!</h3>
            <div className="form-control">

              {/* mail */}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            
             {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
              />

               {/* forget password */}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error */}

            {/* login btn */}
            <div className="mt-6 form-control">
              <input
                type="submit"
                value="Signup"
                className="text-white btn bg-green"
              />
            </div>

            <p className="my-2 text-center">
              Have an account?{" "}
              <button onClick={() => document.getElementById("my_modal_5").showModal()} className="ml-1 underline text-red" to="/login">
                Login
              </button>
              <Modal/>
            </p>

            <Link to="/"   className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</Link>

          </form>

          {/* social sign in */}
          <div className="mb-5 space-x-3 text-center">
            
            <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
            </button>

            <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
            </button>

            <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
            </button>
           
          </div>
        </div>
    </div>
  )
}

export default Signup
Signup