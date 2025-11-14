function traverseDOM(root, callback) {
    const nodes = [];
    
    function collect(node) {
        nodes.push(node);
        node = node.firstElementChild;
        while (node) {
            collect(node);
            node = node.nextElementSibling;
        }
    }

    collect(root);
    callback(nodes);
}

function startNavigation() {
    traverseDOM(document.documentElement, function(nodes) {

        let index = 0;

        function showNode() {
            const node = nodes[index];

            let desc = node.tagName ? `<${node.tagName.toLowerCase()}>` : "текстовий вузол";
            if (node.textContent && node.textContent.trim().length > 0) {
                desc += " → \"" + node.textContent.trim().split(" ")[0] + "...\"";
            }

            if (index === 0) {
                const goNext = confirm(`Вузол #${index + 1}:\n${desc}\n\nПерейти до наступного вузла?`);
                if (goNext) {
                    index++;
                    showNode();
                }
                return;
            }

            if (index === nodes.length - 1) {
                const back = confirm(`Вузол #${index + 1}:\n${desc}\n\nЦе останній вузол.\nПовернутися назад? (Скасувати = вийти)`);
                if (back) {
                    index--;
                    showNode();
                }
                return;
            }

            const action = confirm(`Вузол #${index + 1}:\n${desc}\n\nOK → Далі\nCancel → Назад`);

            if (action) {
                index++;
            } else {
                index--;
            }

            showNode();
        }

        showNode();
    });
}

window.onload = function() {
    setTimeout(startNavigation, 500); 
};