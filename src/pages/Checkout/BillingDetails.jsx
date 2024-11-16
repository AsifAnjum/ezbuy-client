import { forwardRef } from "react";

const BillingDetails = forwardRef(({ userEmail }, ref) => {
  return (
    <div className="md:w-1/3">
      <p className="text-4xl font-bold">Billing Details</p>

      <div className="mt-10 space-y-10">
        <label className="w-full form-control">
          <span className="mb-2 label-text">
            Full Name<span className="text-red-500">*</span>
          </span>

          <input
            type="text"
            name="name"
            ref={(el) => (ref.current.name = el)}
            placeholder="Name"
            className="profile-input "
          />
        </label>
        <label className="w-full form-control">
          <span className="mb-2 label-text">
            Email Address<span className="text-red-500">*</span>
          </span>

          <input
            type="email"
            name="email"
            value={userEmail}
            placeholder="Email Address"
            className="profile-input disabled:border-1 disabled:border-gray-300 disabled:bg-gray-100"
            disabled
          />
        </label>
        <label className="w-full form-control">
          <span className="mb-2 label-text">
            Phone Number<span className="text-red-500">*</span>
          </span>

          <input
            type="tel"
            name="phone"
            ref={(el) => (ref.current.phone = el)}
            placeholder="Phone Number"
            className="profile-input"
            required
          />
        </label>
        <label className="w-full form-control">
          <span className="mb-2 label-text">
            City<span className="text-red-500">*</span>
          </span>

          <input
            type="text"
            name="city"
            ref={(el) => (ref.current.city = el)}
            placeholder="City"
            className="profile-input"
            required
          />
        </label>
        <label className="w-full form-control">
          <span className="mb-2 label-text">
            Street Address<span className="text-red-500">*</span>
          </span>

          <input
            type="text"
            name="streetAddress"
            ref={(el) => (ref.current.streetAddress = el)}
            placeholder="Street Address"
            className="profile-input"
            required
          />
        </label>
      </div>
    </div>
  );
});

BillingDetails.displayName = "BillingDetails";

export default BillingDetails;
