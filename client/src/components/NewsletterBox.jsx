
const NewsletterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault()
    }
  return (
    <>
        <div className="text-center">
            <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
            <p className="text-gray-400 mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 m-auto my-6 pl-3 border">
                <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your Email" required />
                <button className="text-white bg-black text-xs px-10 py-4 cursor-pointer" type="submit">SUBSCRIBE</button>
            </form>
        </div>
    </>
  )
}

export default NewsletterBox