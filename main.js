class Loot {
    constructor(name, rate, tool) {
        this.name = name; // n in name 
        this.rate = rate; // r in rate
        this.tool = tool;   // t in tool
        this.count = 0;
    }
    setCount(){
        this.count += 1;
    }

    reduceCount(){
        this.count -= 1;
    }
}

class MySession {
    constructor(){
        this.ziehung = 0;
        this.autoLegendCount = 0;
        this.lootList = [];    
    }
    getZiehung(){
        return this.ziehung;
    }
    setZiehung(){
        this.ziehung++;
    }
    getAutoLegendCount(){
        return this.autoLegendCount
    }
    setAutoLegendCOunt(){
        this.autoLegendCount += 1;
        console.log('auto+1', this.autoLegendCount);
    }
    resetAutoLegendCount(){
        this.autoLegendCount = this.autoLegendCount = 0;
        console.log('resetted');
    }

    getLootlist(){
        return this.lootList;
    }
    setLootlist(loot){
        loot.forEach(element => {
            this.lootList.push(element);
        });
        
    }
    filterLootlist(){
        let displayArray = this.lootList.filter((element, index) => {
            return this.lootList.indexOf(element) === index;
        });
        return displayArray
    }

}


function creatLoot() { //function a in creatLoot

    // Array von Loot-Objekten mit verschiedenen Namen, RpullTenaten und Werkzeugen
    // Diese Objekte repräsentieren den verfügbaren Loot-Pool.
    const loot = [
        new Loot("waxing gibbous", 0, "axe"),
        new Loot("windforce", 0, "bow"),
        new Loot("asheara's khanjar", 0, "dagger"),
        new Loot("staff of endless rage", 0, "staff"),
        new Loot("doombringer", 0, "sword"),
        new Loot("hellhammer", 0, "mace"),
        new Loot("stinger", 1, "dagger"),
        new Loot("staff of elemental command", 1, "staff"),
        new Loot("infernal edge", 1, "sword"),
        new Loot("mace of blazing furor", 1, "mace"),
        new Loot("butcher's cleaver", 2, "axe"),
        new Loot("skyhunter", 2, "bow"),
        new Loot("godfather", 2, "sword"),
        new Loot("black river", 2, "mace")
    ];
    return loot;
}



//anpassung der wie Wahrscheinlich das Item gezogen wird 0,01 sehr niedrig, 0,99 sehr hoch

const rareRateHigh = 0.01; // Ziehrate für sehr seltene Items
const rareRateMiddle = 0.08; // Ziehrate für seltene Items

//

function getRandomItemByRate(item, rate) { 
    // Filtere das 'item'-Array basierend auf der angegebenen 'rate' (0, 1 oder 2).
    const filteredLoot = item.filter(loot => loot.rate === rate);
    // Wähle einen zufälligen Index im gefilterten Loot-Array.
    const randomFilterIndex = Math.floor(Math.random() * filteredLoot.length);
    // Gib das Loot-Objekt an der ausgewählten Indexposition aus dem gefilterten Array zurück.
    return filteredLoot[randomFilterIndex];
}


function pullOne(item, session) {
    // Holen Sie sich das Element des "pullOne"-Buttons.
    const pullOneButton = document.getElementById("pullOne");
    // Fügen Sie einen Klick-Event-Listener zum "pullOne"-Button hinzu.
    pullOneButton.addEventListener("click", () => {
        // Generiere eine Zufallszahl zwischen 0 und 1.
        let random = Math.random();
        let currentItem;
        let itemArray = [];

        // Basierend auf der zufällig generierten Zahl wird ein Loot-Objekt mit einer bestimmten Rate ausgewählt.
        if (random < rareRateHigh) {
            currentItem = getRandomItemByRate(item, 2);
            itemArray.push(currentItem);
            session.resetAutoLegendCount();

        } else if (random < rareRateMiddle) {
            currentItem = getRandomItemByRate(item, 1);
            itemArray.push(currentItem);
            session.setAutoLegendCOunt();
        } else {
            currentItem = getRandomItemByRate(item, 0);
            itemArray.push(currentItem);
            session.setAutoLegendCOunt();
        }
        currentItem.setCount();
        session.setLootlist(itemArray);

        const p = document.getElementById("obtain"); //all 'rE' in rdmElement
        p.innerHTML = "";
        const rdmElement = document.createElement("div");
        rdmElement.classList.add("item");
        p.appendChild(rdmElement);
        const rdmElementH1 = document.createElement("h2");
        rdmElementH1.classList.add("item_h");
        rdmElementH1.innerText = currentItem.name;
        rdmElement.appendChild(rdmElementH1);
        const rdmElementp1 = document.createElement("p");
        rdmElementp1.classList.add("item_t");
        rdmElementp1.innerText = currentItem.tool;
        rdmElement.appendChild(rdmElementp1);
        const rdmElementp2 = document.createElement("p");
        rdmElementp2.classList.add("item_r");
        if (currentItem.rate === 0) {
            rdmElement.classList.add("c");
        } else if (currentItem.rate === 1) {
            rdmElement.classList.add("r");
        } else {
            rdmElement.classList.add("l");
        }
        rdmElement.appendChild(rdmElementp2);

        //addiert +1 bei AllLoot
        session.setZiehung()
        createItemList(session);
        displayZiehung(session);
    });
    
}


function pullTen(item, session) {
    const pullTenButton = document.getElementById("pullTen");
    pullTenButton.addEventListener("click", () => {
        let results = [];
        let hasRareItem = false;



        // Schleife, um 10 Züge durchzuführen und die Ergebnisse im 'results'-Array zu speichern.
        for (let i = 0; i < 10; i++) {
            let random = Math.random();
            let currentItem;
            //addiert +1 bei AllLoot
            session.setZiehung()
            displayZiehung(session);

            if (random < rareRateHigh) {
                currentItem = getRandomItemByRate(item, 2);
                session.resetAutoLegendCount();
            } else if (random < rareRateMiddle) {
                currentItem = getRandomItemByRate(item, 1);
                session.setAutoLegendCOunt();
            } else {
                currentItem = getRandomItemByRate(item, 0);
                session.setAutoLegendCOunt();
            }
            if(session.getAutoLegendCount() === 90){
                console.log('garantiert!!!');
                currentItem = changeToLegendary(item)
                session.resetAutoLegendCount();
                hasRareItem = true;
            }
            // Speichert Loot-Objekt im 'results'-Array.
            currentItem.setCount();
            results.push(currentItem);
        }

        // Überprüft ob ein seltenes Item (rare 1) unter den Ergebnissen vorhanden ist.
        results.forEach(rareItem => {
            if (rareItem.rate === 1) {
                hasRareItem = true;
            }
        });


        if (!hasRareItem) {
            let randomItemIndex = Math.floor(Math.random() * 10);
            let filter = item.filter(loot => loot.rate === 1);
            let randomFilterIndex = Math.floor(Math.random() * filter.length);
            let rareItem = filter[randomFilterIndex];
            results.splice(randomItemIndex, 1, rareItem);
            //minus count old item
            let minusitem = item[randomFilterIndex];
            minusitem.reduceCount();
            //plus count old item
            rareItem.setCount();
        }

        session.setLootlist(results);

        const p = document.getElementById("obtain");
        p.innerHTML = "";

        results.forEach(rareItem => {
            const rdmElement = document.createElement("div");
            rdmElement.classList.add("item");
            p.appendChild(rdmElement);
            const rdmElementH1 = document.createElement("h2");
            rdmElementH1.classList.add("item_h");
            rdmElementH1.innerText = rareItem.name;
            rdmElement.appendChild(rdmElementH1);
            const rdmElementp1 = document.createElement("p");
            rdmElementp1.classList.add("item_t");
            rdmElementp1.innerText = rareItem.tool;
            rdmElement.appendChild(rdmElementp1);
            const rdmElementp2 = document.createElement("p");
            rdmElementp2.classList.add("item_r");
            if (rareItem.rate === 0) {
                rdmElement.classList.add("c");
            } else if (rareItem.rate === 1) {
                rdmElement.classList.add("r");
            } else {
                rdmElement.classList.add("l");
            }
            rdmElement.appendChild(rdmElementp2);
        });
        createItemList(session)
    });
}
function createItemList(session) {
    //console.log('test');
    const parent = document.getElementById('itemlist');
    parent.innerHTML = "";

    let displayArray = session.filterLootlist()
    displayArray.forEach(element => {
        const itemTag = document.createElement('div');
        parent.appendChild(itemTag);
        itemTag.classList.add ("itemrow");

        const itemName = document.createElement('p');
        itemName.innerText = element.name;
        itemTag.appendChild(itemName);

        const itemRate = document.createElement('p');
        itemRate.innerText = element.rate;
        itemTag.appendChild(itemRate);
        
        const itemTool = document.createElement('p');
        itemTool.innerText = element.tool;
        itemTag.appendChild(itemTool);

        const itemCount =  document.createElement('p');
        itemCount.innerText = element.count;
        itemTag.appendChild(itemCount)
    })
}
const changeToLegendary = (item) => {
    let legendArray = item.filter(loot => loot.rate === 2);
    let randInt = Math.floor(Math.random() * legendArray.length);
    let newLegendary = legendArray[randInt];
    return newLegendary;
}

// zählt Ziehungen hoch
const displayZiehung = (session) => {
    const display = document.getElementById('gesamt');
    display.innerHTML = session.getZiehung();
}

   this.count = 0;
function init() {
    console.log("Make this code clean!");
    // Erstellt den Loot-Pool,durch aufruf von creatpool
    const item = creatLoot();

    const session = new MySession()
    pullOne(item, session);
    pullTen(item, session);
    
}

init();
