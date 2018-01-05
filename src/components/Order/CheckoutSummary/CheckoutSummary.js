import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/CustomButton'
import classes from './CheckoutSummary.css'

const checkoutSummary = ( props ) => {
  
  return ( props.ingredients ?
      <div className={classes.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{ width: '100%', margin: 'auto' }}>
          <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType='Danger' clicked={props.checkoutCancelled}>CANSEL</Button>
        <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
      </div> :
      null
  )
}

export default checkoutSummary