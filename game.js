   /*developed by Ram Yadav*/
   let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");
    let score = 0;
    let snake = [{ x: 10, y: 10 }];
    let snakeDirection = "RIGHT";
    let food = { x: 15, y: 15 };
    let gameInterval;

    // Game speed
    const speed = 100;

    const snakeColors = ["#32CD32", "#FFD700", "#FF6347"]; 

    function startGame() {
        document.getElementById("score").textContent = score;
        document.getElementById("gameOverScreen").style.display = "none"; 
        gameInterval = setInterval(updateGame, speed);
    }

    // Update the game state
    function updateGame() {
        moveSnake();
        checkCollisions();
        updateCanvas();
    }

    // Move snake
    function moveSnake() {
        let head = Object.assign({}, snake[0]);

        switch (snakeDirection) {
            case "UP":
                head.y--;
                break;
            case "DOWN":
                head.y++;
                break;
            case "LEFT":
                head.x--;
                break;
            case "RIGHT":
                head.x++;
                break;
        }

        snake.unshift(head); 
        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById("score").textContent = score;
            generateFood(); 
        } else {
            snake.pop(); 
        }
    }

    // Check for collisions
    function checkCollisions() {
        let head = snake[0];

        // Check if snake hits walls
        if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10) {
            gameOver();
        }

        // Check if snake hits itself
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
            }
        }
    }

    // Draw everything on the canvas
    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw food with a vibrant color
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * 10, food.y * 10, 10, 10);

        // Draw snake with colorful segments
        snake.forEach((segment, index) => {
            ctx.fillStyle = snakeColors[index % snakeColors.length]; // Use a color from the snake color palette
            ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
        });
    }

    // Generate food in a random position
    function generateFood() {
        food.x = Math.floor(Math.random() * (canvas.width / 10));
        food.y = Math.floor(Math.random() * (canvas.height / 10));
    }

    // Handle key events for snake movement
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && snakeDirection !== "DOWN") {
            snakeDirection = "UP";
        } else if (event.key === "ArrowDown" && snakeDirection !== "UP") {
            snakeDirection = "DOWN";
        } else if (event.key === "ArrowLeft" && snakeDirection !== "RIGHT") {
            snakeDirection = "LEFT";
        } else if (event.key === "ArrowRight" && snakeDirection !== "LEFT") {
            snakeDirection = "RIGHT";
        }
    });

    // Handle game over
    function gameOver() {
        clearInterval(gameInterval);
        document.getElementById("finalScore").textContent = score; 
        document.getElementById("gameOverScreen").style.display = "block"; 
    }

    // Restart the game
    function restartGame() {
        snake = [{ x: 10, y: 10 }];
        snakeDirection = "RIGHT";
        score = 0;
        document.getElementById("score").textContent = score;
        startGame();
    }
    /*developed by Ram Yadav*/
    startGame();
