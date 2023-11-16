
import { useEffect, useState } from "react";
// import TableMenu from "./TableMenu";
import { useSelector, useDispatch } from "react-redux"
import { writeItem, deleteItem,total, checkOut, increase, decrease } from "./features/darbarSlice";
import TableMenu from "./TableMenu";
import { PDFDocument,StandardFonts, rgb } from "pdf-lib";

function TableCart(props) {
   
    let pdfBytes
    let billingData={}
    const state = useSelector(state=>state.darbarReducer)
    // console.log(state)
    
const dispatch = useDispatch()

function handleDelete(e,tableno,index){
    e.preventDefault()
    dispatch(deleteItem({tableno,index}))
    dispatch(total({tableno}))                  //update total value of table after deleting
}

async function handleCheckout(e,tableno){
    e.preventDefault()
    await state.forEach(table=>{
        if(table.tableno==tableno){
           billingData=table
        }
    })

    // console.log(billingData)
    pdfBytes=await generateBill(billingData)
    console.log(pdfBytes)
    dispatch(checkOut({tableno}))
}

async function generateBill(billingData){
    async function createPdf(billingData) {
        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const fontSize = 30
        console.log(billingData)
        for(let i=0;i<billingData.items.length;i++){
            const {dish,rate,q} = billingData.items[i]
            page.drawText(dish+" "+rate+" "+q, {
              x: 50,
              y: height-i*80 - 4 * fontSize,
              size: fontSize,
              font: timesRomanFont,
              color: rgb(0, 0.53, 0.71),
            })
        }
        
       
        // console.log("inside")
         return await pdfDoc.saveAsBase64({dataUri : true})
      }
      return await createPdf(billingData)
}

function handleDecrease(e,tableno,dishIndex){
    e.preventDefault()
    dispatch(decrease({tableno,dishIndex}))
    dispatch(total({tableno}))
}

function handleIncrease(e,tableno,dishIndex){
    e.preventDefault()
    // console.log({tableno,dishIndex})
    dispatch(increase({tableno,dishIndex}))
    dispatch(total({tableno}))
}
// const [x,setX] = useState(0)

// function handleTouchMove(e){
//     // e.preventDefault()
//     setX(e.nativeEvent.touches[0].clientX)
//     console.log(x)
// }


    return ( 
        <div className="table-cart">
            
            <div className="parent-row-header">
                        {/* <div className="sno">{dish.dish}</div> */}
                        <div className="sno-row-header">N</div>
                        <div className="dish-row-header">ITEMS</div>
                        <div className="rate-row-header">₹</div>
            </div>
            
            {state.map(table=>{
            if(table.tableno==props.clicked){
                return table.items.map((dish,index)=>{
                    return(
                        <div key={index} className="parent-row">
                        {/* <div className="sno">{dish.dish}</div> */}
                        <div className="sno-row">{index+1}</div>
                        <div className="dish-row">{dish.dish}</div>
                        <div className="rate-row">{dish.rate}</div>
                        <div className="quantity-field" >
                            <button 
                                className="value-button decrease-button" 
                                onClick={(e)=>{handleDecrease(e,table.tableno,index)}} 
                                title="Azalt">-</button>
                                <div className="number">{dish.q}</div>
                            <button 
                                className="value-button increase-button" 
                                onClick={(e)=>{handleIncrease(e,table.tableno,index)}}
                                title="Arrtır"
                            >+
                            </button>
                            </div>

                        <div className="amount-row">{dish.amount}</div>
                        {/* <div className="edit-row">Edit</div> */}
                        <div onClick={(e)=>{handleDelete(e,table.tableno,index)}} className="delete-row"><span className="material-symbols-outlined">
delete_forever
</span></div>
                       
                        </div>
                    )
                })
            }
        })}

            { 
            state.map((table,index)=>{
                if(table.tableno==props.clicked){
                    return  (
                    <div 
                    
                    className="checkout-parent" key={index}>
                    <div className="total-row">Total : ₹ {table.total}/-</div>
                    <div 
                    onClick={(e)=>{handleCheckout(e,table.tableno)}} 
                  
                    className="checkout-row"><span className="material-symbols-outlined cart">
shopping_cart_checkout
</span></div>
                    </div>
                    )
                   }})
            }

         <TableMenu
            tableno = {props.clicked}
            menuList={props.menuList}

            />
           
        </div> 
     );
}

export default TableCart;