const canvas = document.getElementById("plot");
const ctx = canvas.getContext("2d");

var windowWidth = canvas.width = window.innerWidth;
var windowHeight = canvas.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, windowWidth, windowHeight);
ctx.translate(30, 30);

class Plot {
    static data = {};

    static addPlot(name, x, y, width, height, nameX, nameY) {
        Plot.data[name] = {
                            "x": x,
                            "y": y,
                            "width": width,
                            "height": height,
                            "nameX": nameX,
                            "nameY": nameY,
                            "unitX": 10,
                            "unitY": 10,
                            "points": [],
                            "lines": [],
                    };
    }

    static addPoint(name, point) {
        Plot.data[name].points.push(point);
    }

    static addLine(name, axis, value) {
        Plot.data[name].lines.push({
            "axis": axis,
            "value": value,
        });
    }

    
    static drawPlot(name, unitX, unitY){
        var plot = Plot.data[name];

        plot.unitX = unitX;
        plot.unitY = unitY;

        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.font = "20px Verdana";
        ctx.lineWidth = 2;

        ctx.strokeRect(plot.x, plot.y, plot.width, plot.height); //border
        ctx.fillText(name, plot.x,plot.y - 5); //name

        ctx.fillText(plot.nameX, plot.x + plot.width - (plot.nameX.length * 11) - 10, plot.y + plot.height/2 + 20); //nameX
        ctx.fillText(plot.nameY, plot.x + plot.width / 2 + 5, plot.y + 20); //nameY

        ctx.moveTo(plot.x, plot.y+plot.height/2); //x-axis
        ctx.lineTo(plot.x+plot.width, plot.y+plot.height/2);
        ctx.stroke();

        ctx.moveTo(plot.x+plot.width/2, plot.y); //y-axis
        ctx.lineTo(plot.x+plot.width/2, plot.y+plot.height);
        ctx.stroke();

        ctx.translate(plot.x + plot.width / 2, plot.y + plot.height / 2); //Translate to origign

        if(false) { //Linemode
            if(plot.points.length == 0) {
                //do nothing
            } else if(plot.points.length == 1){
                
                if(plot.points[0][0]*plot.unitX>=-plot.width/2 && plot.points[0][0]*plot.unitX<=plot.width/2){
                    if(plot.points[0][1]*plot.unitY<=plot.height/2 && plot.points[0][1]*plot.unitY>=-plot.height/2) {

                        ctx.fillRect(plot.points[0][0] * plot.unitX-1, -plot.points[0][1] * plot.unitY-1, 2, 2);
                    }
                }
            } else if(plot.points.length > 1){
                ctx.moveTo(plot.points[0][0] * plot.unitX, -plot.points[0][1] * plot.unitY);

                for(var i = 1; i < plot.points.length; i++) {
                    ctx.lineTo(plot.points[i][0] * plot.unitX, -plot.points[i][1] * plot.unitY);
                }

                ctx.stroke();
            }
        }

        //Points
        for(var i = 0; i < plot.points.length; i++) {
            if(plot.points[i][0]*plot.unitX>=-plot.width/2 && plot.points[i][0]*plot.unitX<=plot.width/2){
                if(plot.points[i][1]*plot.unitY<=plot.height/2 && plot.points[i][1]*plot.unitY>=-plot.height/2) {
                    ctx.fillRect(plot.points[i][0] * plot.unitX-1, -plot.points[i][1] * plot.unitY-1,2,2);
                }
            }
        }

        //Lines
        for(var i = 0; i < plot.lines.length; i++) {

            if(plot.lines[i].axis == "x"){

                ctx.moveTo(-plot.width/2, -plot.lines[i].value * plot.unitY);
                ctx.lineTo(plot.width/2, -plot.lines[i].value * plot.unitY);
                ctx.stroke();

            } else {
                ctx.moveTo(plot.lines[i].value * plot.unitX, -plot.height/2);
                ctx.lineTo(plot.lines[i].value * plot.unitX, plot.height/2);
                ctx.stroke();
            }
        }

        ctx.translate(-(plot.x + plot.width / 2), -(plot.y + plot.height / 2)); //Translate back
    }

}



