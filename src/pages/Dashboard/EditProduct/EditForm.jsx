import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiInfoBold } from "react-icons/pi";
import { RiImageAddLine } from "react-icons/ri";
import {
  useDeleteProductImageMutation,
  useEditProductImageMutation,
  useEditProductMutation,
} from "../../../redux/features/product/productApi";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProductSchema } from "../../../schemas/productSchema";
import PermissionModal from "../../../modal/PermissionModal";

const EditForm = ({ product }) => {
  const {
    title,
    description,
    brand,
    category,
    price,
    stock,
    tags,
    sale,
    status,
  } = product;

  const [openModal, setOpenModal] = useState(false);
  const [prevImages, setPrevImages] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(false);

  const [
    editProduct,
    { isLoading, isSuccess, error: productError, reset, isError },
  ] = useEditProductMutation();

  const [
    editProductImage,
    {
      isLoading: updateImgLoading,
      isSuccess: updateImgSuccess,
      isError: updateImgIsError,
      error: updateImgError,
      reset: updateImgReset,
    },
  ] = useEditProductImageMutation();

  const [
    deleteProductImage,
    {
      isSuccess: deleteImgSuccess,
      error: deleteImgError,
      reset: deleteImgReset,
    },
  ] = useDeleteProductImageMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
      description: description,
      brand: brand,
      category: category,
      price: price,
      stock: stock,
      tags: tags.join(",") || "",
      sale: sale,
      status: status,
    },

    resolver: zodResolver(editProductSchema),
  });

  const [productImages, setProductImages] = useState([]);

  const onSubmit = (data) => {
    const tags = data["tags"].split(",");

    const modifyData = { ...data, tags, images: undefined };

    const updatedData = {};
    Object.keys(data).forEach((key) => {
      if (JSON.stringify(modifyData[key]) !== JSON.stringify(product[key])) {
        updatedData[key] = modifyData[key];
      }
    });

    if (Object.keys(updatedData).length === 0) {
      toast.warn("No Data Changes");
    } else {
      editProduct({
        id: product._id,
        data: updatedData,
      });
    }
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    imageArr?.forEach((file) => {
      formData.append("images", file);
    });

    formData.getAll("images").length > 0 &&
      editProductImage({ id: product._id, data: formData });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => URL.createObjectURL(file));

    setPrevImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));

    setImageArr((prev) => [...prev, ...files].slice(0, 4));
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenModal(true);
  };

  const handlePrevImageDelete = (index) => {
    setPrevImages(prevImages.filter((_, i) => i !== index));
    setImageArr((prevImageArr) => prevImageArr.filter((_, i) => i !== index));
  };

  const handleRemoveImgRes = (res) => {
    setOpenModal(false);
    if (res) {
      const deleteImages = [];
      deleteImages.push(productImages[deleteIndex]);
      deleteProductImage({ id: product._id, data: deleteImages });
    }
  };

  useEffect(() => {
    if (product?.imgUrls) {
      setProductImages(product.imgUrls);
    }

    if (isError) {
      toast.error("OOPS!!! Try again.");
      if (productError?.data) {
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
      }
    }

    if (deleteImgSuccess && deleteIndex !== null) {
      clearErrors("images");
      deleteImgReset();
      toast.success("Image deleted");
      setDeleteIndex(null);
    }

    if (updateImgIsError) {
      if (updateImgError.status === 413) {
        setError("images", { message: "Image size is too large" });
      } else if (updateImgError.status === 504) {
        setError("images", { message: "Request Timeout. Try again!" });
      } else {
        setError("images", { message: updateImgError.data.message });
      }
    }

    if (deleteImgError?.data) {
      setError("images", { message: deleteImgError.data.message });
      deleteImgReset();
    }

    if (updateImgSuccess && prevImages.length > 0) {
      clearErrors("images");
      toast.success("Images Updated");
      updateImgReset();
      setPrevImages([]);
      setImageArr([]);
    }

    if (isSuccess) {
      reset();
      toast.success("product updated");
    }
  }, [
    product,
    productError,
    deleteImgSuccess,
    deleteIndex,
    isSuccess,
    setError,
    prevImages,
    updateImgError,
    updateImgSuccess,
    updateImgReset,
    deleteImgReset,
    deleteImgError,
    clearErrors,
    reset,
    isError,
    updateImgIsError,
  ]);

  return (
    <>
      <div className="mb-6">
        <p className="font-semibold">Product Images</p>

        <div className="flex gap-4 mt-4 overflow-auto">
          {productImages.map((image, index) => (
            <div key={index} className="relative flex-shrink-0">
              <figure className="h-20 p-2 border-2 bg-slate-100 max-w-20">
                <img
                  src={image}
                  alt="Preview"
                  // width={80}
                  loading="lazy"
                  className="rounded-lg image-bg-remove"
                />
              </figure>
              <button
                type="button"
                className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full hover:bg-red-700"
                onClick={() => handleDelete(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <p className="font-semibold">
          Upload Images
          <span
            className="tooltip tooltip-error"
            data-tip="Maximum 4 images(Max 5mb)"
          >
            <PiInfoBold className="inline mb-1 ml-1 " fill="red" />
          </span>
        </p>

        <div className="">
          <label
            className={` flex flex-col items-center justify-center h-32 border-4 border-dashed rounded-lg cursor-pointer  ${
              productImages?.length + prevImages.length >= 4
                ? "pointer-events-none"
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
              size={5}
              disabled={productImages.length + prevImages.length >= 4}
              {...register("images", {
                onChange: handleImages,
              })}
            />
          </label>
          {errors.images && (
            <p className="form-error">
              {errors?.images?.message || "An error occurred"} !!!
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-4">
          {prevImages.map((image, index) => (
            <div key={index} className="relative">
              <figure className="h-20 p-2 border-2 bg-slate-100 max-w-20">
                <img
                  src={image}
                  alt="Preview"
                  // width={80}
                  loading="lazy"
                  className="rounded-lg image-bg-remove"
                />
              </figure>
              <button
                type="button"
                className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full hover:bg-red-700"
                onClick={() => handlePrevImageDelete(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          disabled={
            updateImgLoading || productImages?.length + prevImages.length > 4
          }
          onClick={handleImageUpload}
          className="mt-5 text-white btn btn-accent"
        >
          Update Images
        </button>
      </div>

      <form
        className="w-full space-y-4 form-control"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1">
            <div className="">
              <label className="font-semibold">Product Category</label>
              <select
                className="w-full select select-bordered bg-slate-100 focus:outline-none"
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
              <label className="font-semibold">Product Status</label>
              <select
                className="w-full select select-bordered bg-slate-100 focus:outline-none"
                defaultValue=""
                {...register("status")}
              >
                <option disabled value="">
                  Select Category
                </option>
                <option value="continued">Continued</option>
                <option value="discontinued">Discontinued</option>
              </select>
              {errors.status && (
                <p className="form-error">{errors.status.message} !!!</p>
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
              <label className="font-semibold">
                Sale
                <span
                  className="tooltip tooltip-info"
                  data-tip="Counts as a percentage"
                >
                  <PiInfoBold className="inline mb-1 ml-1 " fill="#06a7da" />
                </span>
              </label>

              <input
                type="number"
                min={0}
                max={100}
                step={0.01}
                className="w-full input input-bordered border-slate-400 focus:border-none"
                placeholder="product sale price"
                {...register("sale", {
                  setValueAs: (value) =>
                    value === "" ? undefined : parseFloat(value),
                })}
              />
              {errors.sale && (
                <p className="form-error">{errors.sale.message} !!!</p>
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
              // onChange: handleTagInput,
            })}
          />
          {errors.tags && (
            <p className="form-error">{errors.tags.message} !!!</p>
          )}
        </div>
        <div className="space-x-1 space-y-1">
          {[].map((tag, index) => (
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
            value="Update Product"
            className="w-full text-white btn btn-error"
          />
        </div>
      </form>

      {openModal && <PermissionModal confirm={handleRemoveImgRes} />}
    </>
  );
};
export default EditForm;
