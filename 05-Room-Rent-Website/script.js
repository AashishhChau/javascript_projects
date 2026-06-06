const rooms = [
    {
        id: 1,
        name: "Deluxe Single Room",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
        price: 35,
        location: "Kathmandu"
    },
    {
        id: 2,
        name: "Luxury Double Room",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
        price: 60,
        location: "Bhaktapur"
    },
    {
        id: 3,
        name: "Family Suite",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
        price: 90,
        location: "Pokhara"
    }
];

function displayRooms() {
    const roomList = document.getElementById("roomList");
    const roomSelect = document.getElementById("roomSelect");

    rooms.forEach(room => {

        roomList.innerHTML += `
            <div class="room">
                <img src="${room.image}" alt="${room.name}">

                <div class="room-content">
                    <h3>${room.name}</h3>

                    <p>📍 ${room.location}</p>

                    <p class="price">$${room.price} / night</p>

                    <button class="book-btn"
                        onclick="selectRoom(${room.id})">
                        Book This Room
                    </button>
                </div>
            </div>
        `;

        roomSelect.innerHTML += `
            <option value="${room.id}">
                ${room.name}
            </option>
        `;
    });
}

function selectRoom(id) {
    document.getElementById("roomSelect").value = id;

    document.querySelector(".booking-section")
        .scrollIntoView({ behavior: "smooth" });
}

document.getElementById("bookingForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const roomId = Number(
            document.getElementById("roomSelect").value
        );

        const checkIn = new Date(
            document.getElementById("checkIn").value
        );

        const checkOut = new Date(
            document.getElementById("checkOut").value
        );

        if (checkOut <= checkIn) {
            alert("Check-out date must be after check-in date.");
            return;
        }

        const room = rooms.find(r => r.id === roomId);

        const days =
            (checkOut - checkIn) / (1000 * 60 * 60 * 24);

        const totalPrice = days * room.price;

        document.getElementById("message").innerHTML = `
            🎉 Booking Confirmed!<br><br>
            Room: <strong>${room.name}</strong><br>
            Nights: <strong>${days}</strong><br>
            Total Price: <strong>$${totalPrice}</strong>
        `;

        this.reset();
    });

displayRooms();