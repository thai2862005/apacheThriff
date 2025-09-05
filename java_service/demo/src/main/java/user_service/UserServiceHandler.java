package user_service;

import entity.User; // JPA entity
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Persistence;

public class UserServiceHandler implements UserServiceThrift.Iface {

    private final EntityManagerFactory emf;

    public UserServiceHandler() {
        this.emf = Persistence.createEntityManagerFactory("my-persistence-unit");
    }

    @Override
    public user_service.User createUser(String name, String email) {

        EntityManager em = emf.createEntityManager();
        user_service.User result = new user_service.User();

        try {
            em.getTransaction().begin();

            try {
                // 🔎 Kiểm tra email đã tồn tại chưa
                User existing = em.createQuery(
                                "SELECT u FROM User u WHERE u.email = :email", User.class)
                        .setParameter("email", email)
                        .getSingleResult();

                // Nếu tồn tại thì rollback và trả về user cũ
                em.getTransaction().rollback();

                result.setId(existing.getId());
                result.setName(existing.getName());
                result.setEmail(existing.getEmail());

            } catch (NoResultException e) {
                // ✅ Chưa có thì tạo mới
                User user = new User(name, email);
                em.persist(user);
                em.getTransaction().commit();

                // 🔄 Convert từ entity.User -> thrift.User
                result.setId(user.getId());
                result.setName(user.getName());
                result.setEmail(user.getEmail());
            }

        } finally {
            em.close();
        }

        return result;
    }
}
