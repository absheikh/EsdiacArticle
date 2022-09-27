import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articleService from "./articleService";

//Get user from localStorage

const initialState = {
  articles: [],
  my_articles: [],

  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all articles
export const getAllArticles = createAsyncThunk(
  "articles/all",
  async (thunkAPI) => {
    return await articleService.getAllArticles(thunkAPI);
  }
);
// get all my articles
export const getMyArticles = createAsyncThunk(
  "articles/lists/all",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    return await articleService.getMyArticles(token);
  }
);
// add article
export const addArticle = createAsyncThunk(
  "articles/add",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await articleService.addArticle(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update articles
export const updateArticle = createAsyncThunk(
  "articles/update",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await articleService.updateArticle(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete articles
export const deleteArticle = createAsyncThunk(
  "articles/delete",
  async (uuid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await articleService.deleteArticle(uuid, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// // Login user
// export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
//   try {
//     return await articleService.login(user);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });
export const logout = createAsyncThunk("auth/logout", async () => {
  await articleService.logout();
});
export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.articles = null;
      })
      .addCase(getMyArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.my_articles = action.payload;
      })
      .addCase(getMyArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.my_articles = null;
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Article updated successfully";
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Article deleted successfully";
      });
  },
});

export const { reset } = articleSlice.actions;
export default articleSlice.reducer;
