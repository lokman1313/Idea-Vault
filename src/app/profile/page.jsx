"use client";

import UpdateProfile from "@/components/UpdateProfile";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
;

const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
    </div>
  );
};

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const userData = session?.user;

  return (
    <div className="container mx-auto flex items-center justify-center my-10 px-4">
      
      <div className="w-full max-w-lg bg-linear-to-br from-purple-300 via-blue-300 to-gray-200 py-16 md:px-12 px-6 rounded-3xl shadow-xl border border-gray-200">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            My Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and settings
          </p>
        </div>

        {isPending && <Spinner />}

        {!isPending && !userData && (
          <p className="text-center text-gray-600">No user found</p>
        )}

        {!isPending && userData && (
          <div className="space-y-5 text-center">

            <div className="flex justify-center">
              <Avatar className="size-16">
              {userData.image ? (
                <Avatar.Image alt={userData.name} src={userData.image} />
              ) : (
                <Avatar.Fallback>
                  {userData?.name?.charAt(0) || "U"}
                </Avatar.Fallback>
              )}
            </Avatar>
            </div>

            <div>
              <p className="text-lg font-medium text-gray-800">
                {userData.name}
              </p>
              <p className="text-sm text-gray-600">{userData.email}</p>
            </div>

            <UpdateProfile userData={userData}></UpdateProfile>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;