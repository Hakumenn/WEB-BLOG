document.addEventListener('DOMContentLoaded', () => {
    // Screen Navigation
    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('landing-screen').classList.replace('active', 'hidden');
        document.getElementById('garage-screen').classList.replace('hidden', 'active');
        document.getElementById('driver-license').classList.remove('hidden');
    });

    const puzzleData = {
        0: { // ENGINE
            name: "ENGINE", correct: "Engine Lubrication", options: ["Tire Change", "Engine Lubrication", "Flat tire"],
            storyTitle: "Arrival Day/ First Day",
            storyText: "Departure and we are all excited as you can see from our faces, especially when it is my first time going to Manila and explore tons of new stuff and learn from this educational tour.",
            storyImages: ["storyimages/zambo airport.jpg", "storyimages/zambo departure.jpg","storyimages/inside plane.jpg" , "storyimages/outside cathedral first day.jpg","storyimages/first day pics.jpg", "storyimages/first day nayss kadawg.jpg"] 
        },
        1: { // TRANSMISSION
            name: "TRANSMISSION", correct: "Torque Converter", options: ["Torque Converter", "Wrench", "Car keys"],
            storyTitle: "Second Day",
            storyText: "this is where we test the smart evolution of every company we visited like the Hytec Power Inc. and the Opentext.",
            storyImages: ["storyimages/hytec power.jpg", "storyimages/dj in hytec.jpg", "storyimages/hytec power fixing.jpg", "storyimages/still hytec.jpg", "storyimages/wash hands in hytec.jpg", "storyimages/leaving opentext building.jpg", "storyimages/opentext jeep.jpg", "storyimages/opextext program.jpg"] 
        },
        2: { // SUSPENSION
            name: "SUSPENSION", correct: "Shock Piston", options: ["Spring Coil", "Bracket", "Shock Piston"],
            storyTitle: "Third Day",
            storyText: "The day where i first go to the MMDA and BGC good times",
            storyImages: ["storyimages/mmda groupic.jpg", "storyimages/mmda bossing.jpg", "storyimages/mmda voltes.jpg", "storyimages/mmda.jpg", "storyimages/voltes going to bgc.jpg", "storyimages/bowlengg after mmda.jpg", "storyimages/bgc voltes.jpg", "storyimages/mirror shot after mmda.jpg"] 
        },
        3: { // BRAKES
            name: "BRAKES", correct: "Brake Fluid", options: ["Rotator", "Brake Fluid", "Fluid"],
            storyTitle: "Fourth Day",
            storyText: "We went to Topeg Animation studio and i draw Jake the dog",
            storyImages: ["storyimages/seryos drawing topeg.jpg", "storyimages/top peg drawing.jpg", "storyimages/drawing topeg.jpg"] 
        },
        4: { // EXHAUST
            name: "EXHAUST", correct: "Exhaust Pipes", options: ["Exhaust Pipes", "Cap", "Gas Oil"],
            storyTitle: "Fifth Day",
            storyText: "this day was the most memorable because of the free time and schedule we have, we went to tagaytay and visited the Peoples park and sky ranch.",
            storyImages: ["storyimages/group pic tagaytay.jpg", "storyimages/peoples park tagaytay.jpg", "storyimages/tagaytay.jpg"] 
        },
        5: { // BATTERY
            name: "BATTERY", correct: "12V cell Array", options: ["tires", "12V cell Array", "Light Bulb"],
            storyTitle: "Sixth Day",
            storyText: "The day we arrive at Baguio city where we enjoy eating strawberry and much more",
            storyImages: ["storyimages/before going baguio.jpg","storyimages/bell church wasiksik.jpg", "storyimages/bell church view.jpg", "storyimages/bell church.jpg", "storyimages/latrinidad_strawberryfarm.jpg", "storyimages/my hero bell church.jpg", "storyimages/pma1.jpg", "storyimages/strawberry farm.jpg", "storyimages/voltes bell church.jpg"] 
        },
        6: { // TIRES
            name: "TIRES", correct: "Extra Tires", options: ["Radiator", "Brake Fluid", "Extra Tires"],
            storyTitle: "Seventh Day",
            storyText: "Departure time, before leaving Manila here are some of the dumps",
            storyImages: ["storyimages/bagang bading.jpg", "storyimages/baji dump.jpg", "storyimages/going home.jpg", "storyimages/iggy mo boi dump.jpg", "storyimages/sleeping bai.jpg", "storyimages/truepa dump.jpg", "storyimages/vi sotto.jpg"] 
        }
    };

    let partsState = [false, false, false, false, false, false, false];
    let currentActivePartId = null;
    let currentImageArray = [];
    let currentImageIndex = 0;

    const modal = document.getElementById('modal');
    const puzzleArea = document.getElementById('puzzle-area');
    const storyReveal = document.getElementById('story-reveal');
    const slot = document.getElementById('component-slot');
    const tray = document.getElementById('options-tray');
    const repairBtn = document.getElementById('repair-btn');
    const puzzleInstruction = document.getElementById('puzzle-instruction');
    const storyImage = document.getElementById('story-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageCounter = document.getElementById('image-counter');

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function updateCarousel() {
        storyImage.src = currentImageArray[currentImageIndex];
        imageCounter.innerText = `${currentImageIndex + 1} / ${currentImageArray.length}`;
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === currentImageArray.length - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) { currentImageIndex--; updateCarousel(); }
    });

    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < currentImageArray.length - 1) { currentImageIndex++; updateCarousel(); }
    });

    document.querySelectorAll('.part-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.getAttribute('data-id'));
            if (partsState[id]) return; 

            currentActivePartId = id;
            document.getElementById('modal-title').innerText = `DIAGNOSTIC: ${puzzleData[id].name}`;
            repairBtn.innerText = "> INITIATE REPAIR";
            repairBtn.disabled = true;
            
            puzzleArea.classList.remove('hidden');
            storyReveal.classList.add('hidden');
            
            slot.className = 'empty-slot';
            slot.innerText = '[ EMPTY SLOT ]';
            puzzleInstruction.innerText = `ERROR: Memory Corrupted. Insert correct part to unlock.`;
            puzzleInstruction.style.color = 'var(--alert-red)';
            
            tray.innerHTML = '';
            const options = shuffleArray([...puzzleData[id].options]);
            
            options.forEach(opt => {
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece'; piece.innerText = `[ ${opt} ]`;
                piece.addEventListener('click', () => {
                    if (opt === puzzleData[id].correct) {
                        puzzleInstruction.innerText = "MEMORY UNLOCKED. DIAGNOSTIC COMPLETE.";
                        puzzleInstruction.style.color = 'var(--text-neon)';
                        puzzleArea.classList.add('hidden');
                        
                        currentImageArray = puzzleData[id].storyImages;
                        currentImageIndex = 0;
                        updateCarousel();
                        
                        document.getElementById('story-title').innerText = puzzleData[id].storyTitle;
                        document.getElementById('story-text').innerText = puzzleData[id].storyText;
                        storyReveal.classList.remove('hidden');
                        
                        repairBtn.innerText = "> LOG MEMORY & REPAIR BUS";
                        repairBtn.disabled = false;
                    } else {
                        piece.classList.add('wrong');
                        puzzleInstruction.innerText = "INCOMPATIBLE PART. TRY AGAIN.";
                        setTimeout(() => piece.classList.remove('wrong'), 400);
                    }
                });
                tray.appendChild(piece);
            });
            modal.classList.add('show');
        });
    });

    repairBtn.addEventListener('click', () => {
        if (currentActivePartId !== null) {
            partsState[currentActivePartId] = true;
            
            const activeCard = document.querySelector(`.part-card[data-id="${currentActivePartId}"]`);
            activeCard.classList.replace('broken', 'fixed');
            activeCard.querySelector('.status').innerText = "FIXED";
            
            if (currentActivePartId === 6 || currentActivePartId === 3) {
                document.getElementById('tire-rear').setAttribute('fill', 'var(--text-neon)');
                document.getElementById('tire-front').setAttribute('fill', 'var(--text-neon)');
            }
            if (currentActivePartId === 4 || currentActivePartId === 2 || currentActivePartId === 1) {
                document.querySelectorAll('.bus-stripe').forEach(s => s.setAttribute('fill', 'var(--text-neon)'));
            }
            if (currentActivePartId === 5) {
                document.getElementById('headlight').setAttribute('fill', '#ffff00');
                document.getElementById('taillight').setAttribute('fill', '#ff0000');
            }
            
            updateGarageStatus();
            modal.classList.remove('show');
            currentActivePartId = null;
        }
    });

    function updateGarageStatus() {
        const fixedCount = partsState.filter(Boolean).length;
        const integrity = Math.floor((fixedCount / 7) * 100);
        
        document.getElementById('status-text').innerText = `INTEGRITY: ${integrity}% | PARTS REPAIRED: ${fixedCount} / 7`;
        document.getElementById('progress-fill').style.width = integrity + '%';

        if (fixedCount === 7) {
            document.getElementById('system-status').innerText = "STATUS: ALL SYSTEMS NOMINAL. READY FOR IGNITION.";
            document.getElementById('system-status').style.color = "var(--text-neon)";
            
            document.getElementById('djm-sign').classList.remove('hidden');
            document.getElementById('ignition-container').classList.remove('hidden');
            
            const carContainer = document.getElementById('car-container');
            carContainer.classList.add('success-state');
            
            setTimeout(() => {
                carContainer.classList.add('driving');
            }, 1500);
        }
    }

    document.getElementById('close-modal').addEventListener('click', () => { modal.classList.remove('show'); currentActivePartId = null; });
    document.getElementById('reboot-btn').addEventListener('click', () => location.reload());
    
    // Portfolio Logic
    const portfolioModal = document.getElementById('portfolio-modal');
    const driverLicenseBtn = document.getElementById('driver-license');
    const closePortfolioBtn = document.getElementById('close-portfolio');
    
    driverLicenseBtn.addEventListener('click', () => portfolioModal.classList.add('show'));
    closePortfolioBtn.addEventListener('click', () => portfolioModal.classList.remove('show'));
});
