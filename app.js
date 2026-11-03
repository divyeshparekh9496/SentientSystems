'use strict';
const workflows = {
  research: { number: '01', title: 'Turn a business question<br>into a reviewed decision brief.', description: 'Research agents gather evidence, analysis agents compare options, and a reviewer checks sources and assumptions before your team makes the decision.', steps: [['Research', 'Gather relevant evidence'], ['Analyze', 'Compare options and tradeoffs'], ['Review', 'Check claims and surface gaps'], ['Your team', 'Approve the next step']] },
  operations: { number: '02', title: 'Move a recurring request<br>through a coordinated workflow.', description: 'An intake agent structures the request, a planning agent identifies the next steps, and an execution agent prepares work in agreed tools. Your team reviews exceptions and approves consequential actions.', steps: [['Intake', 'Structure the request and check inputs'], ['Plan', 'Identify tasks, owners, and dependencies'], ['Prepare', 'Draft updates in connected tools'], ['Your team', 'Review exceptions and authorize actions']] },
  knowledge: { number: '03', title: 'Put company knowledge<br>to work with traceable answers.', description: 'Retrieval agents find relevant internal material, a synthesis agent prepares an answer, and a reviewer checks it against the evidence. Missing or conflicting information is surfaced for your team.', steps: [['Retrieve', 'Find material within agreed permissions'], ['Synthesize', 'Prepare an answer with source references'], ['Verify', 'Check support and flag uncertainty'], ['Your team', 'Resolve gaps and give feedback']] }
};
document.querySelectorAll('[data-workflow]').forEach(button => button.addEventListener('click', () => {
  const data = workflows[button.dataset.workflow];
  document.querySelectorAll('[data-workflow]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('workflow-detail').innerHTML = `<div><p class="eyebrow">ILLUSTRATIVE WORKFLOW / ${data.number}</p><h3>${data.title}</h3><p>${data.description}</p></div><ol>${data.steps.map(([role, task]) => `<li>${role}<span>${task}</span></li>`).join('')}</ol>`;
}));
const priorities = ['quality', 'cost', 'speed'];
function updateObjective() {
  const values = priorities.map(id => Number(document.getElementById(id).value));
  const total = values.reduce((sum, value) => sum + value, 0);
  const weights = values.map(value => total ? value / total : 0);
  priorities.forEach((id, index) => { document.getElementById(`${id}-value`).textContent = `${Math.round(weights[index] * 100)}%`; });
  document.getElementById('objective-formula').textContent = `J = ${weights[0].toFixed(2)}E + ${weights[1].toFixed(2)}C + ${weights[2].toFixed(2)}T`;
  const explanations = ['The strongest penalty is on errors: prioritize more verification and review.', 'The strongest penalty is on operating cost: favor resource-efficient approaches within quality constraints.', 'The strongest penalty is on completion time: favor faster handoffs within quality constraints.'];
  const max = Math.max(...values);
  document.getElementById('objective-description').textContent = !total ? 'All penalties are zero. Set at least one priority to define an objective.' : values.filter(value => value === max).length > 1 ? 'The highest priorities are tied. Compare candidate approaches against these shared priorities.' : explanations[values.indexOf(max)];
}
priorities.forEach(id => document.getElementById(id).addEventListener('input', updateObjective));
updateObjective();
