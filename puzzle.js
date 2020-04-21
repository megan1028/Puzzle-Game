var time=0; 
// to save the time
var pause=true;
//true means pause
var set_timer;

var outDiv = new Array(10);
//array for outside div
outDiv[1]=1; outDiv[2]=2; outDiv[3]=3;
outDiv[4]=4; outDiv[5]=5; outDiv[6]=6;
outDiv[7]=7; outDiv[8]=8; outDiv[9]=0;
//since we only have 8 cubes so there is nothing in no.9 div then the number is 0

var moveSpace =[
        [0],//leave it empty on purpose
        [2,4],//the no.1 small div can go to 2 and 4
        [1,3,5],
        [2,6],
        [1,5,7],
        [2,4,6,8],
        [3,5,9],
        [4,8],
        [5,7,9],
        [6,8]
        ];
var posXY=[
        [0],
        [0,0],//first number is for left position, second one is for top
        [150,0],
        [300,0],
        [0,150],
        [150,150],
        [300,150],
        [0,300],
        [150,300],
        [300,300]
        ];

function move(id){

	if(!pause){

	var i =1;
	for(i=1; i<10;i++){
		if(outDiv[i]==id)
			break;
	}
	//to find which div the cube is in right now

	var target=0;
	//to save the div number where the cube can go
	target = whereCanGo(i);
   
   if(target != 0){

   	outDiv[i]=0;
   	//since we moved the cube out so the div is empty
    outDiv[target]=id;

    document.getElementById("d"+id).style.left=posXY[target][0]+"px";
    document.getElementById("d"+id).style.top=posXY[target][1]+"px";
     //set the new position 
   }
}
   var finish = true;
   //to know id the game has finished true means finish
   for(var k=1; k<9;k++){
   	if(outDiv[k] != k){
   		finish = false;
   		break;
   		//check if the cube number is the same with div
   	}   	
   }
   if(finish==true){
   	 if(!pause)
   	 	start();
   	 alert("Congratulations! You did it.");
   }
}

function whereCanGo(num){
	var j=0;
	
	for(j=0;j<moveSpace[num].length;j++){
		if(outDiv[moveSpace[num][j]]==0){
				return moveSpace[num][j];			
		}
				
	}
	return 0;
}

function timer() {
	time+=1;
	var min = parseInt(time/60);
	var sec = time%60;
	document.getElementById("timer").innerHTML=min+"min"+sec+"s";
}

function start(){
	if(pause){
		document.getElementById("start").innerHTML="pause";
		pause=false;
        set_timer=setInterval(timer,1000);
	}
	else{
		document.getElementById("start").innerHTML="start";
		pause=true;
		clearInterval(set_timer);
	}
}

function reset(){
	time = 0;
	random_d();
	if(pause)
		start();
}

function random_d(){
	for(var i=9; i>1; --i){
        var to=parseInt(Math.random()*(i-1)+1);//generate random number between 1 to 9
        if(outDiv[i]!=0){
            document.getElementById("d"+outDiv[i]).style.left=posXY[to][0]+"px";
            document.getElementById("d"+outDiv[i]).style.top=posXY[to][1]+"px";
        }
       
        if(outDiv[to]!=0){
            document.getElementById("d"+outDiv[to]).style.left=posXY[i][0]+"px";
            document.getElementById("d"+outDiv[to]).style.top=posXY[i][1]+"px";
        }
        
        var tem=outDiv[to];
        outDiv[to]=outDiv[i];
        outDiv[i]=tem;
        
    }
}
//The idea here is generating a random number to, and then swith the to th cube with the ith cube

window.onload=function(){
    reset();
}