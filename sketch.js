let sketch = function(p) {
	p.canvas;
	p.canvasX = 0;
	p.canvasY = 0;
	p.canvasWidth;
	p.canvasHeight;
	p.cellSize = 175;
	p.pad = 20;
	p.xbound;
	p.ybound;
	p.floaters = [];
	p.speed = 1;
	p.amp; // TODO: Figure out how to use p5.sound.js in instance mode
	
	p.setup = function() {
		p.canvasWidth = p.windowWidth;
		p.canvasHeight = p.windowHeight;
		p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
		p.canvas.position(p.canvasX, p.canvasY);
		p.canvas.style('pointer-events', 'none');
		//p.amp = new p5.Amplitude();
		p.xbound = p.width + p.cellSize;
		p.ybound = p.height - (p.height % p.cellSize);
		p.pad = p.width / 30;

		for (let x = 0; x < p.xbound; x+=p.cellSize) {
			for (let y = 0; y < p.ybound; y+=p.cellSize) {
				p.floaters.push(new p.Floater(x, y));
			}
		}
	}

	p.draw = function() {
		p.clear();
		for (let i = 0; i < p.floaters.length; i++) {
			p.floaters[i].display();
			p.floaters[i].move();
		}
	}

	p.windowResized = function() {
		// Resize canvas with window
		p.canvas.size(p.windowWidth, p.windowHeight);
		// Force DOM elements to refresh immediately (??)
		p.mouseWheel();
		// We also need to do this again for some reason
		p.canvas.style('pointer-events', 'none');
	}

	p.mouseWheel = function(event) {
		// Move canvas with scroll
		p.canvas.position(p.canvasX /*+ document.documentElement.scrollLeft*/,
			p.canvasY + document.documentElement.scrollTop);
	}


	p.Floater = class {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.diameter = p.random(p.cellSize/4, p.cellSize - p.pad);
			if (p.random(0, 5) > 3) {
				this.pulse = true;
			} else {
				this.pulse = false;
			}
		}

		move() {
			this.y += p.speed;
			if (this.y > p.ybound) {
				this.y = 0;
			}
		}

		display() {
			//let volume = amp.getLevel();

			let d = this.diameter;
			if (this.pulse) {
				//d = p.map(volume, 0, 1, this.diameter, p.cellSize);
			}

			let floaterColor = p.color(255);
			floaterColor.setAlpha(p.map(this.y, 0, p.height, 25, 0));
			p.strokeWeight(0.05)
			p.fill(floaterColor);

			p.ellipseMode(p.CENTER);
			p.ellipse(this.x, this.y, d, d);
		}
	}
}

let myp5 = new p5(sketch);