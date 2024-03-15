import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom"

function UserAvatar() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { firstName, lastName } = user;

    return (
        <div>
            <div className="flex-shrink-0 group block">
                <div className="flex items-center">
                    <img
                        onClick={() => navigate("/account")}
                        className="inline-block flex-shrink-0 h-[2rem] w-[2rem] rounded-full cursor-pointer"
                        src={"https://wbwcdwquffnvigyndarr.supabase.co/storage/v1/object/public/avatars/default-user.jpg"}
                        alt={`Avatar of ${firstName}`}
                    />
                    <div className="ml-3">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                            {firstName} {lastName}
                        </h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserAvatar
