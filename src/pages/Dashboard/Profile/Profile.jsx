import ItemNotFound from "../../../component/ui/error/ItemNotFound";
import ComponentLoader from "../../../component/ui/loader/ComponentLoader";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  const { data, isLoading, isError } = useGetMeQuery();

  const user = data?.data || {};

  let content;

  if (isLoading) {
    content = <ComponentLoader />;
  } else if (isError) {
    content = <ItemNotFound message="Something Went Wrong!!!" />;
  } else if (!Object.keys(user).length) {
    content = <ItemNotFound message="No User Found" />;
  } else if (Object.keys(user).length) {
    content = <ProfileForm user={user} />;
  }
  return (
    <div className="p-8 shadow-xl shadow-slate-700">
      <p className="text-3xl font-semibold text-red-500">Edit Your Profile</p>
      {content}
    </div>
  );
};
export default Profile;
