const { Router } = require("express");
const EmiModel = require("../Models/Emi.model");

const Emi = Router();

//Emi Calcualtion
Emi.post("/emi", async (req, res) => {
  // const { loan, tenure, rate } = req.body;
  let new_data=new EmiModel(req.body);
  await new_data.save()


  // try {
  //   let r=data.rate/(12*100)
  //   let calc=data.loan *r * ( 1 +r )**data.tenure / ( ( 1 +r )**data.tenure- 1 ) 
  //   let totalamount = +(calc * data.tenure);
  //   let interest = +(totalamount - data.loan);
  //   res.send({ emi: calc , totalamount:totalamount,interest:interest });
  // } catch (error) {
  //   res.send("error");
  // }
});
module.exports = Emi;
