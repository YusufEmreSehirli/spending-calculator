// buton ve inputları çekmek
const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");


// gider
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter)

let total = 0;

function updateTotal(price) {
    total += Number(price);
    totalInfo.textContent = total;
    console.log(total)

}



function addExpense(e) {
    e.preventDefault()

    if (// ! boşsa veya değer yoksa
        !priceInput.value || !spendingInput.value
    ) {
        alert("Lütfen Değer Giriniz!")
        return;
    }


    //veri girildiğinde div oluşturma
    const spendingDiv = document.createElement("div");

    // class ekleme
    spendingDiv.classList.add("spending");

    if (statusCheck.checked) {
        spendingDiv.classList.add("payed");



    }


    //içerik ayarlama
    spendingDiv.innerHTML = `
        <h2> ${spendingInput.value} =</h2>
        <h2 id="value"> ${priceInput.value} </h2>
        <div class="buttons">
            <img id="payment" src="images/payment.png" alt="">
            <img  id ="remove" src="images/delete.png" alt="">
        </div>`;


    // listeye eleman ekleme
    list.appendChild(spendingDiv);

    //girilen değerleri toplama
    updateTotal(priceInput.value);

    //formu temizleme
    spendingInput.value = "";
    priceInput.value = "";


}


function handleClick(e) {
    const element = e.target;

    if (element.id === "remove") {
        const wrapper = element.parentElement.parentElement;
        //console.log(wrapper)

        //silinen elemanın fiyatını alıp totalden çıkartma
        const deletedPrice = wrapper.querySelector("#value").innerText
        Number(deletedPrice.innerText);
        updateTotal(- Number(deletedPrice));


        //kapsayıcıyı kaldırmak
        wrapper.remove();
    }


}


// filtreleme


function handleFilter(e) {
    const items = list.childNodes;
    items.forEach((item) => {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
                break;

            case "payed":
                // Yalnızca "payed" olanları gizle
                if (!item.classList.contains("payed")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
                break;

            case "not-payed":
                // Yalnızca "payed" olmayanları gizle
                if (item.classList.contains("payed")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
                break;
        }
    });
}
