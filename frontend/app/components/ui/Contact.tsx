import { UserType } from "../lib/definitions"

export default function Contact({
    user
}: {
    user: UserType
}) {
    return (
        <div className="p-2 font-medium text-gray-700 flex justify-between">
            <span>{user.last_name} {user.first_name} {user.middle_name}</span>
            <span>{user.job}</span>
            <span>{user.phone}</span>
        </div>
    )
}