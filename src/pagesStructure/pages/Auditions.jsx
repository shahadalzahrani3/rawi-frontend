[{
 id:1,
 narrator:"ريم القحطاني",
 experience:5,
 language:"فصحى",
 status:"Pending"
}
]

{narrators.map(narrator => (

<div key={narrator.id}>

<h3>{narrator.name}</h3>

<p>
{narrator.language}
</p>

<p>
{narrator.experience} سنوات
</p>

<button>
قبول
</button>

<button>
رفض
</button>

</div>

))}
