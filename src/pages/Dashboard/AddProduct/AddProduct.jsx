import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiInfoBold } from "react-icons/pi";
import { RiImageAddLine } from "react-icons/ri";
import { productSchema } from "../../../schemas/productSchema";
import { useAddProductMutation } from "../../../redux/features/product/productApi";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [imageArr, setImageArr] = useState([]);

  const [
    addProduct,
    { data: productData, error: productError, isLoading, isError },
  ] = useAddProductMutation();

  const handleTagInput = (e) => {
    const input = String(e.target.value);
    const newTags = input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "" && tag.length >= 3);

    setTags(newTags);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));

    setImageArr((prev) => [...prev, ...files].slice(0, 4));
  };
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImageArr((prevImageArr) => prevImageArr.filter((_, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    tags?.forEach((tag) => formData.append("tags", tag));

    imageArr?.forEach((file) => {
      formData.append("images", file);
    });

    addProduct(formData);
  };

  useEffect(() => {
    if (isError) {
      if (productError?.data) {
        toast.error("OOPS!!! Try again.");
        const apiErrors = productError.data?.error[0]?.field;

        if (apiErrors) {
          productError.data.error.forEach((err) => {
            setError(err.field, {
              type: "manual",
              message: err.message,
            });
          });
        } else {
          setError("global", {
            type: "manual",
            message: productError.data.message,
          });
        }
      } else {
        toast.error("OOPS!!! Try again.");
      }
    }

    if (productData?.success) {
      toast.success("product created");
      setTags([]);
      setImageArr([]);
      setImages([]);
      reset();
    }
  }, [setError, productError, productData, reset, isError]);

  return (
    <div>
      <div className="p-10 rounded-lg shadow-xl shadow-slate-700">
        <form
          className="w-full space-y-4 form-control"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="font-bold divider">Product Info</div>

          <div>
            <label className="font-semibold">Product Title</label>
            <input
              type="text"
              className="w-full input input-bordered border-slate-400 focus:border-none"
              placeholder="Product Title"
              {...register("title")}
            />
            {errors.title && (
              <p className="form-error">{errors.title.message} !!!</p>
            )}
          </div>
          <div className="">
            <label className="font-semibold">Brand Name</label>
            <input
              type="text"
              className="w-full input input-bordered border-slate-400 focus:border-none"
              placeholder="write brand name"
              {...register("brand")}
            />
            {errors.brand && (
              <p className="form-error">{errors.brand.message} !!!</p>
            )}
          </div>

          <div className="">
            <label className="font-semibold">Product Description</label>
            <textarea
              type="text"
              className="w-full textarea textarea-bordered border-slate-400 focus:border-none"
              placeholder="write description"
              {...register("description")}
            />
            {errors.description && (
              <p className="form-error">{errors.description.message} !!!</p>
            )}
          </div>

          <div className="">
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              <div className="">
                <label className="font-semibold">Product Category</label>
                <select
                  className="w-full select select-bordered bg-slate-100 focus:outline-none"
                  name=""
                  defaultValue=""
                  {...register("category")}
                >
                  <option disabled value="">
                    Select Category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Kitchen">Home & Kitchen</option>
                  <option value="Toys">Toys</option>

                  <option value="Sports">Sports</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Others">Others</option>
                </select>
                {errors.category && (
                  <p className="form-error">{errors.category.message} !!!</p>
                )}
              </div>

              <div className="">
                <label className="font-semibold">Product Price</label>

                <input
                  type="number"
                  step="0.01"
                  className="w-full input input-bordered border-slate-400 focus:border-none"
                  placeholder="product price"
                  {...register("price", {
                    setValueAs: (value) =>
                      value === "" ? undefined : parseFloat(value),
                  })}
                />
                {errors.price && (
                  <p className="form-error">{errors.price.message} !!!</p>
                )}
              </div>

              <div className="">
                <label className="font-semibold">Product Stock</label>

                <input
                  type="number"
                  className="w-full input input-bordered border-slate-400 focus:border-none"
                  placeholder="product stock"
                  {...register("stock", {
                    setValueAs: (value) =>
                      value === "" ? undefined : parseFloat(value),
                  })}
                />
                {errors.stock && (
                  <p className="form-error">{errors.stock.message} !!!</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="font-semibold">
              Upload Images
              <span
                className="tooltip tooltip-error"
                data-tip="Maximum 4 images"
              >
                <PiInfoBold className="inline mb-1 ml-1 " fill="red" />
              </span>
            </label>
            <div className="">
              <label
                className={` flex flex-col items-center justify-center h-32 border-4 border-dashed rounded-lg cursor-pointer  ${
                  images.length >= 4
                    ? "cursor-not-allowed "
                    : "hover:border-slate-500"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-7">
                  <RiImageAddLine className="text-gray-500" size={27} />
                  <p className="pt-1 text-sm tracking-wider text-gray-400">
                    Attach files
                  </p>
                </div>

                <input
                  type="file"
                  className="opacity-0"
                  multiple
                  disabled={images.length >= 4}
                  {...register("images", {
                    onChange: (e) => handleImageUpload(e),
                  })}
                />
              </label>
              {errors.images && (
                <p className="form-error">{errors.images.message} !!!</p>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt="Preview"
                    loading="lazy"
                    width={80}
                    className="rounded-lg image-bg-remove"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full hover:bg-red-700"
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <label className="font-semibold">
              Tags
              <span
                className="tooltip tooltip-info"
                data-tip="Separate each tag with a comma, At least 3 characters"
              >
                <PiInfoBold className="inline mb-1 ml-1 " fill="#06a7da" />
              </span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered border-slate-400 focus:border-none"
              placeholder="Product tags"
              {...register("tags", {
                onChange: handleTagInput,
              })}
            />
            {errors.tags && (
              <p className="form-error">{errors.tags.message} !!!</p>
            )}
          </div>
          <div className="space-x-1 space-y-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block p-2 text-white rounded-lg bg-slate-700"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
          {errors.global && (
            <p className="form-error">{errors.global.message} !!!</p>
          )}

          <div className="">
            <input
              disabled={isLoading}
              type="submit"
              value="Create Product"
              className="text-white btn btn-error btn-block"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
