import { useState, useEffect } from "react";
import { IoMdMail } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSendMessageMutation } from "../../redux/features/message/messageApi";
import SuccessModal from "../../modal/SuccessModal";
import { toast } from "react-toastify";

const Contact = () => {
  const [sendMessage, { isLoading, error, isSuccess }] =
    useSendMessageMutation();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);

      setFormData({});
    }

    if (error) {
      toast.warn("OOPS!!! Try Again.");
    }
  }, [isSuccess, error]);

  return (
    <section className="my-20 ">
      {/* navigation */}
      <div className="text-sm breadcrumbs">
        <ul className="text-slate-500">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="font-bold text-black cursor-pointer">Contact</li>
        </ul>
      </div>

      <div className="flex gap-10 mt-10 max-lg:flex-col-reverse">
        <div className="w-2/6 max-lg:w-full">
          <div className="p-10 space-y-10 font-semibold shadow-xl">
            <div className="flex items-center gap-10">
              <IoCallOutline
                size={40}
                className="p-2 text-white bg-red-500 rounded-full"
              />
              <span className="mt-1 text-xl font-bold tracking-wider">
                Call To Us
              </span>
            </div>

            <p>We are available 24/7, 7 days a weak</p>
            <p>Phone: +880 1845 438 140</p>

            <hr className="border-black" />

            <div className="flex items-center gap-10">
              <IoMdMail
                size={40}
                className="p-2 text-white bg-red-500 rounded-full"
              />
              <span className="mt-1 text-xl font-bold tracking-wider">
                Write To Us
              </span>
            </div>
            <p className="">
              Fill out our form and we will contact you within 24 hours
            </p>
            <p>Emails: custom@ezbuy.com</p>
            <p>Email: support@ezbuy.com</p>
          </div>
        </div>

        {/* form  */}
        <form
          onSubmit={handleSubmit}
          className="w-2/3 p-10 space-y-10 shadow-xl max-lg:w-full"
        >
          <div className="flex justify-between gap-2 max-md:flex-col">
            <div className="relative ">
              <input
                type="text"
                value={formData.name || ""}
                name="name"
                onChange={handleChange}
                required
                className=" profile-input focus:bg-white peer"
              />
              <label
                className={`absolute transition-all pointer-events-none text-slate-400 top-3 left-2 peer-focus:-top-3 peer-focus:text-black peer-focus:opacity-100 peer-focus:z-50 ${
                  formData?.name?.length ? "opacity-0" : ""
                }`}
              >
                Your Name <span className="text-red-400">*</span>
                <span className="absolute inset-0 px-1 bg-white z-[-1] top-1/2 left-0 transform -translate-y-1/2"></span>
              </label>
            </div>
            <div className="relative ">
              <input
                type="email"
                value={formData.email || ""}
                name="email"
                onChange={handleChange}
                required
                className="profile-input focus:bg-white peer placeholder-:text-red-500"
              />
              <label
                className={`absolute transition-all pointer-events-none text-slate-400 top-3 left-2 peer-focus:-top-3 peer-focus:text-black peer-focus:opacity-100 peer-focus:z-50 ${
                  formData?.email?.length ? "opacity-0" : ""
                }`}
              >
                Your Email <span className="text-red-400">*</span>
                <span className="absolute inset-0 px-1 bg-white z-[-1] top-1/2 left-0 transform -translate-y-1/2"></span>
              </label>
            </div>
            <div className="relative ">
              <input
                type="tel"
                value={formData.phone || ""}
                name="phone"
                required
                onChange={handleChange}
                className="profile-input focus:bg-white peer placeholder-shown:text-red-500"
              />
              <label
                className={`absolute transition-all pointer-events-none text-slate-400 top-3 left-2 peer-focus:-top-3 peer-focus:text-black peer-focus:opacity-100 peer-focus:z-50 ${
                  formData?.phone?.length ? "opacity-0" : ""
                }`}
              >
                Your Phone <span className="text-red-400">*</span>
                <span className="absolute inset-0 px-1 bg-white z-[-1] top-1/2 left-0 transform -translate-y-1/2"></span>
              </label>
            </div>
          </div>
          <div className="relative">
            <textarea
              value={formData.message || ""}
              name="message"
              onChange={handleChange}
              required
              className="py-4 !h-72 resize-none profile-input focus:bg-white peer"
            ></textarea>
            <label
              className={`absolute transition-all pointer-events-none text-slate-400 top-3 left-2 peer-focus:-top-3 peer-focus:text-black peer-focus:opacity-100 peer-focus:z-50 ${
                formData?.message?.length ? "opacity-0" : ""
              }`}
            >
              Your Message <span className="text-red-400">*</span>
              <span className="absolute inset-0 px-1 bg-white z-[-1] top-1/2 left-0 transform -translate-y-1/2"></span>
            </label>
          </div>
          <button
            disabled={isLoading}
            className="flex ml-auto text-white btn-wide btn btn-error "
          >
            Send Message
          </button>
        </form>
      </div>
      {showModal && <SuccessModal title="We will get back to you soon!" />}
    </section>
  );
};
export default Contact;
