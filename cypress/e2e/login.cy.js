describe("Login Form Tests:", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı form doldurulduğunda success sayfasını açar", () => {
    cy.get('[data-cy="email-input"]').type("test@test.com");
    cy.get('[data-cy="password-input"]').type("Test1234");
    cy.get('[data-cy="terms-input"]').check();

    cy.get('[data-cy="submit-button"]').should("not.be.disabled").click();

    cy.contains("Success").should("be.visible");
    cy.contains("Giriş başarılı!").should("be.visible");
  });

  it("Hatalı durumlarda hata mesajlarını gösterir ve buton disabled kalır", () => {
    // Sadece email yanlış
    cy.get('[data-cy="email-input"]').type("yanlisemail");

    cy.get('[data-cy="error-message"]').should("have.length", 1);
    cy.contains("Geçerli bir email adresi giriniz.").should("be.visible");
    cy.get('[data-cy="submit-button"]').should("be.disabled");

    // Email ve password yanlış
    cy.get('[data-cy="password-input"]').type("123");

    cy.get('[data-cy="error-message"]').should("have.length", 2);

    cy.contains(
      "Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir.",
    ).should("be.visible");

    // Email ve password doğru ama şartlar kabul edilmedi
    cy.get('[data-cy="email-input"]').clear().type("test@test.com");

    cy.get('[data-cy="password-input"]').clear().type("Test1234");

    cy.get('[data-cy="submit-button"]').should("be.disabled");
  });
});
