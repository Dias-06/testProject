import { createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit"

export interface Product {
    id: number;
    title: string;
    image: string;
    liked?: boolean;
    isLocal?: boolean;
}

export interface DetailedProduct {
    id: number,
    title: string,
    image: string,
    description: string,
    authors: any [],
    publish_date: number,
    number_of_pages: number,
}

export interface ProductsState {
    items: Product[];
    selected: DetailedProduct | null;
    status: "idle" | "loading" | "fault";
}

const initialState: ProductsState = {
    items: [],
    selected: null,
    status: "idle"
}

export const getAllBooks = createAsyncThunk(
    'products/fetch',
    async () => {
        const response = await fetch('https://api.bigbookapi.com/search-books?api-key=bd0b25720faf465e8dcae59b44bca441&query=books')
        console.log({
            count: response.headers.get('x-api-quota-left')
        })
        const data = await response.json()
        const result = data.books.map((item : any[]) => ({
            ...item[0],
            liked: false
        }))
        return result;
    }
)

export const getBookById = createAsyncThunk('products/fetchById',async (id : number) => {
    const response = await fetch(`https://api.bigbookapi.com/${id}?api-key=bd0b25720faf465e8dcae59b44bca441`)
    console.log({
        count: response.headers.get('x-api-quota-left')
    })
    const data = await response.json()
    console.log(data)
    return data;
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggleLike: (state,action) => {
            const product = state.items.find(item =>item.id == action.payload);
            console.log(action.type);
            if(product){
                product.liked = !product.liked;
            }
        },
        deleteProduct: (state,action) => {
            const newState = state.items.filter(item => item.id != action.payload);
            state.items = newState;
        },
        addProduct: (state, action : PayloadAction<Product>) =>{
            state.items.push({...action.payload, id: Date.now(), isLocal: true});
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBooks.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getAllBooks.fulfilled, (state, action) => {
                state.status = "idle"
                state.items = action.payload
            })
            .addCase(getAllBooks.rejected, (state) => {
                state.status = "fault"
            })
            .addCase(getBookById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.status = "idle"
                state.selected = action.payload
            })
            .addCase(getBookById.rejected, (state) => {
                state.status = "fault"
            })

    }
})
export const {toggleLike,deleteProduct,addProduct} = productsSlice.actions
export default productsSlice.reducer
