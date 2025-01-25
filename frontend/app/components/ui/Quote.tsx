'use client'
export default function Quote({
    text,
    author,
}: {
    text: string,
    author: string,
}) {
    return (
        <div className="mt-4 self-end px-10 text-primary text-end italic font-normal text-lg">
            <div>" {text} "</div>
            <div>{author}</div>
        </div>
    )
}