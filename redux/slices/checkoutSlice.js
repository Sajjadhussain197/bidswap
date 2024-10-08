const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    currentStep: 1,
    checkoutFormData: {},
};
const checkoutSlice = createSlice({
    name: "Checkout",
    initialState,
    reducers: 
    {
setCurrentStep: (state,action)=>{
state.currentStep =action.payload ;
     },
updatecheckoutFormData: (state,action)=> {
    state.checkoutFormData = {
    ...state.checkoutFromData,
    ...action.payload, };
},
},
});
export const{ setCurrentStep,updatecheckoutFormData }=checkoutSlice.actions;
export default checkoutSlice.reducer;
