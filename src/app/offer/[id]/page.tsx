export default function OfferPage({ params }:
  { params: { id: string } }
) {
  
  // TODO: add adding offer to favorites
  return (
    <main>
      <section>
        TODO: there should be image carousel
      </section>
      <section>
        there should be time created
        price
        description
      </section>
      <section>
        there should be user recommendations
      </section>
      <section>
        there should be offer localization
      </section>
      <section>
        There should be other offers from user
      </section>
      Hello
      offer with id {params.id}
    </main>
  );

  // TODO: additionally there should be bottom popup that recommends to create account
}