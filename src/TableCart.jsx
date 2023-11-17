
import { useEffect, useState } from "react";
// import TableMenu from "./TableMenu";
import { useSelector, useDispatch } from "react-redux"
import { writeItem, deleteItem,total, checkOut, increase, decrease } from "./features/darbarSlice";
import TableMenu from "./TableMenu";
import { PDFDocument,StandardFonts, rgb } from "pdf-lib";
import axios from "axios";

function TableCart(props) {
    let billNo
    let pdfBase64Url
    let pdfBase64
    let billingData={}

    // const [bill, setBill] = useState(false)
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
    const {pdfBase64Url,pdfBase64}=await generateBill(billingData)
    // console.log(pdfBase64Url)
    
// for sending bill pdf to drive folder    
    const data = await axios.post('https://script.google.com/macros/s/AKfycbxt38_mWjsD8H1bf6u9Gh7isB3yMOiQxavHlM6jlj3TEPNNa8MjW1eY6VYjiYkBo3Pq/exec', {base64 : pdfBase64, name :billNo, type : "application/pdf" }, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    })
    
///// For sending bill summary in spreadsheet
    const billSummary = await axios.post('https://script.google.com/macros/s/AKfycbzTjyO7rbxFM8wNGGINLCJBMmqEtFoJsCk-xqXDIRwXPGTIqH9_LGpodC8_KFZKSvFShQ/exec', {billNo,total:billingData.total }, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    })


    // const output = billingData.data
    // console.log(output)
    console.log(pdfBase64Url)
    // await open(pdfBase64Url)
    dispatch(checkOut({tableno}))
}


// bill generating pdf function
async function generateBill(billingData){
    async function createPdf(billingData) {
        let currentdate = new Date(); 
    billNo =    
                currentdate.getFullYear().toString()
                + (currentdate.getMonth()+1).toString()
                +currentdate.getDate().toString()
                + currentdate.getHours().toString()  
                + currentdate.getMinutes().toString()
                + currentdate.getSeconds().toString();
        
        
        
        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        
        // y : height (total height of page) - 2 * fontsize (it signifies line width from next line)

        let fontSize = 30
        let h = 1
        console.log(billingData)

            h=1
            page.drawText(
`          
                                    SHAHI DARBAR

Bill No. : ${billNo}              Date : ${currentdate.getDate()}-${currentdate.getMonth()+1}-${currentdate.getFullYear()}


ITEMS---------------------------RATE--------QTY-------AMT
-----------------------------------------------------------------------
`,     
            {
              x: 50,
              y: height-h*20 - 2 * fontSize,
              size: 20,
              font: timesRomanFont,
              color: rgb(0, 0, 0),
            })

          

h=7
        fontSize = 30
        console.log(billingData)
               
        
        for(let i=0;i<=billingData.items.length;i++){
            
            if(i==billingData.items.length){ 
                
                page.drawText(`${"\n".repeat(i*2)}-----------------------------------------------`, {
                    x: 50,
                    y: height-(h)*30 - 2 * fontSize,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                  })
                
                page.drawText(`${"\n".repeat(i*2)}                                         Total : Rs.${billingData.total}/-`, {
                    x: 50,
                    y: height-(h)*35 - 2 * fontSize, 
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                  })
            }else{

                const {dish,rate,q,amount} = billingData.items[i]
                page.drawText(`${"\n".repeat(i*2)}${dish}-----${rate}-----${q}-----${amount}`, {
                  x: 50,
                  y: height-(h)*30 - 2 * fontSize,
                  size: fontSize,
                  font: timesRomanFont,
                  color: rgb(0, 0, 1),
                })
            }
        }
        
       
        // console.log("inside")
        pdfBase64Url= await pdfDoc.saveAsBase64({dataUri:true})
        pdfBase64 = await pdfDoc.saveAsBase64()
        return {pdfBase64Url,pdfBase64}
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