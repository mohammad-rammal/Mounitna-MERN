import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


// Fetch All Categories
export function fetchCategories(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.get("/api/categories");
            dispatch(categoryActions.setCategories(data));
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}


// Create Category
export function createCategory(newCategory) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/categories", newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(categoryActions.addCategory(data));
            toast.success("Category created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}



// delete Category
export function deleteCategory(categoryId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(categoryActions.deleteCategory(data.categoryId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
