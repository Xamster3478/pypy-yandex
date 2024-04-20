<script>
  const apiKey = '167c4d4a5bf332d6538f2476';

  let amount1 = 1;
  let amount2 = 0;
  let rate = 1;
  let selectedCurrency1 = 'USD';
  let selectedCurrency2 = 'EUR';
  let options = ['USD', 'EUR', 'GBP', 'RUB'];

  async function loadRate() {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${selectedCurrency1}?apiKey=${apiKey}`);
    const data = await response.json();
    rate = data.rates[selectedCurrency2];
    convert1to2();
  }

  function convert1to2() {
    amount2 = (amount1 * rate).toFixed(2);
  }

  function convert2to1() {
    amount1 = (amount2 / rate).toFixed(2);
  }

  $: if(selectedCurrency1 && selectedCurrency2) loadRate();

  $: if ($$self.$$.dirty & /*amount1*/ 1) {
    convert1to2();
  }

  $: if ($$self.$$.dirty & /*amount2*/ 2) {
    convert2to1();
  }
</script>

<div>
  <select bind:value={selectedCurrency1}>
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
  <input type="number" bind:value={amount1} on:input={convert1to2}/>

  <select bind:value={selectedCurrency2}>
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
  <input type="number" bind:value={amount2} on:input={convert2to1}/>
</div>
