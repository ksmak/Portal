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
            {text && <div>" {text} "</div>}
            {author && <div>{author}</div>}
        </div>
    )
}