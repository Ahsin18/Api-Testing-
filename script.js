console.log("HELLOOIII");

let name = "Ahsin";
const age=20;
console.log(name,age);

function greet(){
    console.log("Helloo.");
}
greet();


const add= function (a,b)
{
    return a + b;
};

console.log(add(2,3)); 

/*setTimeout(function(){
    console.log(" THis will run for 2 seconds ");
}, 2000);*/

function calc(x,y,op)
{
    return op(x,y);
}
console.log(calc(2,3,add));



if(age > 18)
{
    console.log("You are eligible to vote.");
}
else{
    console.log("You are not eligible to vote.");
}

function Converttors(d)
{
   r = d*95;
   console.log(r);
}
Converttors(50);
function changebg() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    let body_bg = document.querySelector('body');
    body_bg.style.cssText = 'background-color: rgb(' + r + ', ' + g + ', ' + b + ')';
}