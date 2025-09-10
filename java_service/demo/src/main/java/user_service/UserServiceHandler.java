package user_service;

import java.util.ArrayList;
import java.util.List;

import org.apache.thrift.TException;

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

    // Helper convert Entity -> Thrift
    private user_service.User convertToThrift(User user) {
        user_service.User thriftUser = new user_service.User();
        thriftUser.setId(user.getId().intValue()); // JPA id thường là Long
        thriftUser.setName(user.getName());
        thriftUser.setEmail(user.getEmail());
        return thriftUser;
    }

    @Override
    public user_service.User createUser(String name, String email, String phone, String address) {
        EntityManager em = emf.createEntityManager();
        user_service.User result;
        try {
            em.getTransaction().begin();

            try {
                // 🔎 Check email tồn tại chưa
                User existing = em.createQuery(
                        "SELECT u FROM User u WHERE u.email = :email", User.class)
                        .setParameter("email", email)
                        .getSingleResult();

                // Rollback nếu tồn tại
                em.getTransaction().rollback();
                result = convertToThrift(existing);

            } catch (NoResultException e) {
                // ✅ Nếu chưa có -> thêm mới
                User user = new User(name, email, phone, address);
                em.persist(user);
                em.getTransaction().commit();
                result = convertToThrift(user);
            }

        } finally {
            em.close();
        }
        return result;
    }

    @Override
    public user_service.User getUserById(int id) {
        EntityManager em = emf.createEntityManager();
        user_service.User result = null;
        try {
            User user = em.find(User.class, (long) id);
            if (user != null) {
                result = convertToThrift(user);
            }
        } finally {
            em.close();
        }
        return result;
    }

    @Override
    public user_service.User updateUser(int id, String name, String email, String phone, String address) {
        EntityManager em = emf.createEntityManager();
        user_service.User result = null;
        try {
            em.getTransaction().begin();
            User user = em.find(User.class, (long) id);
            if (user != null) {
                user.setName(name);
                user.setEmail(email);
                em.merge(user);
                result = convertToThrift(user);
            }
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return result;
    }

    @Override
    public boolean deleteUser(int id) {
        EntityManager em = emf.createEntityManager();
        boolean deleted = false;
        try {
            em.getTransaction().begin();
            User user = em.find(User.class, (long) id);
            if (user != null) {
                em.remove(user);
                deleted = true;
            }
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return deleted;
    }
    
    @Override
public List<user_service.User> getAllUsers() throws TException {
    EntityManager em = emf.createEntityManager();
    List<user_service.User> result = new ArrayList<>();

    try {
        List<User> users = em.createQuery("SELECT u FROM User u", User.class).getResultList();

        for (User u : users) {
            user_service.User thriftUser = new user_service.User();
            thriftUser.setId(u.getId().intValue()); // ép Long → int
            thriftUser.setName(u.getName());
            thriftUser.setEmail(u.getEmail());
            result.add(thriftUser);
        }
    } finally {
        em.close();
    }

    return result;
}
    public List<user_service.User> getUsersPaged(int page, int pageSize) throws TException {
        EntityManager em = emf.createEntityManager();
        List<user_service.User> result = new ArrayList<>();

        try {
            List<User> users = em.createQuery("SELECT u FROM User u", User.class)
                    .setFirstResult((page - 1) * pageSize)
                    .setMaxResults(pageSize)
                    .getResultList();

            for (User u : users) {
                user_service.User thriftUser = new user_service.User();
                thriftUser.setId(u.getId().intValue()); // ép Long → int
                thriftUser.setName(u.getName());
                thriftUser.setEmail(u.getEmail());
                result.add(thriftUser);
            }
        } finally {
            em.close();
        }

        return result;
    }
    
}
