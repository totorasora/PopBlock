import { useDispatch } from "react-redux";
import { useState } from "react";

function UpdatePostForm({ post , setUpdateShowModal}) {
    const dispatch = useDispatch();

    const [body, setBody] = useState(post.body);
    const [errors, setErrors] = useState([]);


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!body) {
            setErrors(["Must fill out all fields"]);
        } else {
            let newPost = {
                ...post,
                body: body
            }
            dispatch()
            setUpdateShowModal(false);
        }
    }

    return (
        <div>
            <form onSubmit={console.log("submitted")}>
                <ul>
                    {errors.map(error => <li key={error} className="error-messages">{error}</li>)}
                </ul>
                <label>Body
                    <input type="textarea" value={body} onChange={(e) => {setBody(e.target.value)}} ></input>
                </label>

                <button>Submit</button>
            </form>

        </div>
        )
}

export default UpdatePostForm
