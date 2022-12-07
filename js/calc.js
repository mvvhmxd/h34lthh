
const form = document.getElementById('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const gender = getSelectedValue('gender');
    const age = getInputNumberValue('age');
    const weight = getInputNumberValue('weight');
    const height = getInputNumberValue('height');  
    const activityLevel = getSelectedValue('activity_level');

    const tmb = Math.round(
        gender === 'female'
        ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
        : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
    );
    const maintenance = Math.round(tmb * Number(activityLevel));
    const loseWeight = maintenance - 450;
    const gainWeight = maintenance + 450;

    const layout = `
        <h2>:النتيجة</h2>
        <div class="result-content">
        <ul>
            <li>
            معدل الايض:     <strong>${tmb} سعرة</strong>
            </li>
            <li>
            للثبات على وزنك الحالي استهلك:      <strong>${maintenance} سعرة</strong>
            </li>
            <li>
            لخسارة الوزن استهلك:      <strong>${loseWeight} سعرة</strong>
            </li>
            <li>
            لزيادة الوزن استهلك:      <strong>${gainWeight} سعرة</strong>
            </li>
        </ul>
        </div>
    `;

    const result = document.getElementById('result');

    result.innerHTML = layout;
}

function getSelectedValue(id) {
    const select = document.getElementById(id);
    return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
    return Number(document.getElementById(id).value);
}